import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

import QuestionInput from '../QuestionInput';

import {Field} from '../../lib/field';
import {Path} from '../../lib/path';

const styles = StyleSheet.create({
  field: {
    marginTop: 8,
    marginBottom: 8
  },
  label: {
    marginTop: 12,
    marginBottom: 4
  }
});

type Props = {
  field: Field;
  path: Path;
  onChange(path: Path, value: string): void;
};

export default class Question extends React.Component<Props> {
  render() {
    const {field, onChange} = this.props;

    if (field.type === 'compound' || field.type === 'multiple') {
      return (
        <React.Fragment>
          {field.fields.map((f, i) => (
            <View key={f.name}>
              {f.label ? <Text style={styles.label}>{f.label}</Text> : null}

              <QuestionInput
                field={f}
                path={[...this.props.path, 'fields', i]}
                onChange={onChange}
                editable={true}
              />
            </View>
          ))}
        </React.Fragment>
      );
    }

    return (
      <React.Fragment>
        {field.label ? <Text style={styles.label}>{field.label}</Text> : null}

        <QuestionInput
          field={field}
          path={this.props.path}
          onChange={onChange}
          editable={true}
        />
      </React.Fragment>
    );
  }
}
