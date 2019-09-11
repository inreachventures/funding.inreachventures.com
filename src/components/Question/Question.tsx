import React from 'react';
import {Button, View, StyleSheet, Text} from 'react-native';

import QuestionField from '../QuestionField';

import {Question as Q} from '../../lib/question';
import {Field} from '../../lib/field';
import {Path} from '../../lib/path';
import {colors} from '../../lib/theme';

const styles = StyleSheet.create({
  question: {
    shadowColor: colors.greenDark,
    shadowRadius: 4,
    borderRadius: 4,
    overflow: 'hidden',
    padding: 16
  },
  title: {
    color: colors.green,
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16
  },
  hint: {
    marginTop: 16,
    color: colors.greenMuted
  },
  fields: {
    marginTop: 16,
    marginBottom: 16
  },
  field: {
    marginTop: 8,
    marginBottom: 8
  },
  label: {
    marginTop: 8,
    marginBottom: 4
  },
  add: {
    marginTop: 8
  },
  remove: {
    marginTop: 8
  }
});

/**
  Clone a field removing any values from it
*/
function clean(f: Field): Field {
  if (f.type === 'compound' || f.type === 'multiple') {
    return {...f, fields: f.fields.map(clean)};
  }

  return {...f, value: ''};
}

type Props = {
  question: Q;
  path: Path;
  onChange(path: Path, value: string | Field[]): void;
};

export default class Question extends React.Component<Props> {
  addMultipleChoice = (field: Field) => () => {
    const {
      question: {fields}
    } = this.props;

    this.props.onChange(
      [...this.props.path, 'fields'],
      [...fields, clean(field)]
    );
  };

  removeMultipleChoice = (i: number) => () => {
    this.props.onChange(
      [...this.props.path, 'fields'],
      [
        ...this.props.question.fields.slice(0, i),
        ...this.props.question.fields.slice(i + 1)
      ]
    );
  };

  render() {
    const {question, onChange} = this.props;
    return (
      <View style={styles.question}>
        <Text style={styles.title}>{question.title}</Text>

        {question.hint ? (
          <Text style={styles.hint}>{question.hint}</Text>
        ) : null}

        <View style={styles.fields}>
          {question.fields.map((field, i, all) => (
            <React.Fragment key={field.name + i}>
              <QuestionField
                field={field}
                path={[...this.props.path, 'fields', i]}
                onChange={onChange}
              />

              {field.type === 'multiple' ? (
                <React.Fragment>
                  {all.length > 1 ? (
                    <View style={styles.remove}>
                      <Button
                        color={colors.red}
                        title="remove"
                        onPress={this.removeMultipleChoice(i)}
                      />
                    </View>
                  ) : null}

                  {i === question.fields.length - 1 ? (
                    <View style={styles.add}>
                      <Button
                        color={colors.green}
                        title="add"
                        onPress={this.addMultipleChoice(field)}
                      />
                    </View>
                  ) : null}
                </React.Fragment>
              ) : null}
            </React.Fragment>
          ))}
        </View>
      </View>
    );
  }
}
