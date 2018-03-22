import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Auth from './Auth';
import Form from './Form';
import {FormProvider} from './FormContext';
import Me from './Me';
import Landing from './Landing';
import Onboarding from './Onboarding';
import Success from './Success';
import TrackPageViews from './TrackPageViews';

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <FormProvider>
          <TrackPageViews>
            <Switch>
              <Route path="/" component={Landing} exact />

              <Route path="/auth" component={Auth} exact />

              <Route path="/form/:section?" component={Form} exact />
              <Route path="/me" component={Me} exact />
              <Route path="/Onboarding" component={Onboarding} exact />
              <Route path="/success" component={Success} exact />
            </Switch>
          </TrackPageViews>
        </FormProvider>
      </Router>
    );
  }
}
