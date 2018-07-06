import React from 'react';
import {debounce} from 'lodash';
import {set, lensPath} from 'ramda';
import Raven from 'raven-js';
import GA from 'react-ga';

import FormContext from './FormContext';

import {environment} from '../../lib/config';
import {Form} from '../../lib/form';
import {Field} from '../../lib/field';
import {Path} from '../../lib/path';
import {RemoteData} from '../../lib/remoteData';
import * as form from '../../api/form';

type State = RemoteData<string, Form>;

export default class FormProvider extends React.Component<{}, State> {
  state: State = {
    type: 'NotAsked'
  };
  recordSubmit = (label: string) => {
    if (environment == 'production') {
      GA.event({
        category: 'form',
        action: 'submit',
        label
      });
    }
  };

  update = (path: Path, value: string | Field[]) => {
    this.setState(set(lensPath(['data', 'sections', ...path]), value));

    return this.save();
  };

  save = debounce(() => {
    if (this.state.type === 'Success') {
      return form.save(this.state.data.id, this.state.data.sections);
    }

    return Promise.reject('Cannot save at this time');
  }, 500);

  submit = () => {
    if (this.state.type === 'Success') {
      this.recordSubmit(this.state.data.id);

      return form.submit(this.state.data.id, this.state.data.sections);
    }

    return Promise.reject('Cannot submit at this time');
  };

  componentDidMount() {
    form
      .latest()
      .then(({id, submission, answers}) => {
        if (!id || !submission) {
          throw new Error('Unable to load form');
        }

        this.setState({
          type: 'Success',
          data: {
            id,
            sections: submission.sections,
            answers,
            update: this.update,
            save: this.save,
            submit: this.submit
          }
        });
      })
      .catch((error) => {
        if (Raven.isSetup()) {
          Raven.captureException(error);
        } else {
          console.error(error);
        }

        this.setState({type: 'Failure', error: error.message});
      });
  }

  render() {
    return (
      <FormContext.Provider value={this.state}>
        {this.props.children}
      </FormContext.Provider>
    );
  }
}
