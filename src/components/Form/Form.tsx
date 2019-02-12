import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import {Redirect, RouteComponentProps} from 'react-router';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import faCheckCircle from '@fortawesome/fontawesome-free-solid/faCheckCircle';
import faArrowCircleLeft from '@fortawesome/fontawesome-free-solid/faArrowCircleLeft';
import faArrowCircleRight from '@fortawesome/fontawesome-free-solid/faArrowCircleRight';
import faSpinner from '@fortawesome/fontawesome-free-solid/faSpinner';

import {FormConsumer} from '../FormContext';
import Navigation from '../Navigation';
import Section from '../Section';
import Success from '../Success';

import {colors} from '../../lib/theme';
import {RemoteData} from '../../lib/remoteData';

const styles = StyleSheet.create({
  form: {
    flex: 1
  },
  navigation: {
    marginBottom: 16
  },
  loading: {
    flex: 1,
    justifyContent: 'center'
  },
  navigationButton: {
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: colors.green,
    borderWidth: 1,
    borderStyle: 'solid',
    color: colors.green,
    fontSize: 14,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4
  },
  navigationButtonDisabled: {
    color: colors.greenLightMuted,
    borderColor: colors.greenLightMuted
  },
  successButton: {
    backgroundColor: colors.green,
    color: 'white'
  },
  error: {
    flexDirection: 'row'
  },
  errorMessage: {
    flex: 1,
    backgroundColor: colors.red,
    color: 'white',
    fontSize: 24,
    padding: 32,
    textAlign: 'center'
  }
});

type NavigationButtonProps = {
  type: 'back' | 'next' | 'submit' | 'submitting';
  onPress(): void;
  disabled?: boolean;
};

function NavigationButton({
  type,
  onPress,
  disabled = false
}: NavigationButtonProps) {
  if (type === 'submit') {
    return (
      <TouchableHighlight
        disabled={disabled}
        onPress={onPress}
        underlayColor="transparent"
      >
        <Text style={[styles.navigationButton, styles.successButton]}>
          Submit <FontAwesomeIcon icon={faCheckCircle} />
        </Text>
      </TouchableHighlight>
    );
  }

  if (type === 'submitting') {
    return (
      <Text style={[styles.navigationButton, styles.successButton]}>
        Submit <FontAwesomeIcon icon={faSpinner} spin />
      </Text>
    );
  }

  if (type === 'back') {
    return (
      <TouchableHighlight
        disabled={disabled}
        onPress={onPress}
        underlayColor="transparent"
      >
        <Text
          style={[
            styles.navigationButton,
            disabled ? styles.navigationButtonDisabled : {}
          ]}
        >
          <FontAwesomeIcon icon={faArrowCircleLeft} /> Back
        </Text>
      </TouchableHighlight>
    );
  }

  return (
    <TouchableHighlight
      disabled={disabled}
      onPress={onPress}
      underlayColor="transparent"
    >
      <Text
        style={[
          styles.navigationButton,
          disabled ? styles.navigationButtonDisabled : {}
        ]}
      >
        Next <FontAwesomeIcon icon={faArrowCircleRight} />
      </Text>
    </TouchableHighlight>
  );
}

type Props = RouteComponentProps<{section?: string}>;

type State = RemoteData<string, null>;

export default class Form extends React.Component<Props> {
  state: State = {type: 'NotAsked'};

  submit = (fn: () => Promise<{}>) => () => {
    this.setState({type: 'Loading'}, () => {
      fn()
        .then(() => {
          this.setState({type: 'Success', data: null});
        })
        .catch(() => {
          this.setState({
            type: 'Failure',
            error: 'Submitting the form failed. Try again.'
          });
        });
    });
  };

  dismiss = () => {
    this.setState({type: 'Initial'});
  };

  render() {
    const {
      match: {
        params: {section}
      },
      history
    } = this.props;

    if (this.state.type === 'Success') {
      return <Success dismiss={this.dismiss} />;
    }

    return (
      <FormConsumer>
        {(f) => {
          if (f.type === 'Success') {
            const index = f.data.sections.findIndex((s) => s.path === section);

            if (!!section && index === -1) {
              return <Redirect to="/form" />;
            }

            return (
              <View style={styles.form}>
                <Navigation
                  links={f.data.sections.map((s) => ({
                    href: s.path,
                    label: s.title
                  }))}
                  style={styles.navigation}
                />

                {this.state.type === 'Failure' ? (
                  <View>
                    <Text style={styles.errorMessage}>{this.state.error}</Text>
                  </View>
                ) : null}

                {section ? (
                  <Section
                    back={
                      <NavigationButton
                        type="back"
                        onPress={() =>
                          history.push(
                            `/form/${f.data.sections[index - 1].path}`
                          )
                        }
                        disabled={index === 0}
                      />
                    }
                    next={
                      index >= f.data.sections.length - 1 ? (
                        <NavigationButton
                          type={
                            this.state.type === 'Loading'
                              ? 'submitting'
                              : 'submit'
                          }
                          onPress={this.submit(f.data.submit)}
                        />
                      ) : (
                        <NavigationButton
                          type="next"
                          onPress={() =>
                            history.push(
                              `/form/${f.data.sections[index + 1].path}`
                            )
                          }
                        />
                      )
                    }
                    section={f.data.sections.find((s) => s.path === section)!}
                    path={[index, 'questions']}
                  />
                ) : (
                  <Redirect to={`/form/${f.data.sections[0].path}`} />
                )}
              </View>
            );
          }

          if (f.type === 'Failure') {
            return (
              <View style={styles.form}>
                <Navigation style={styles.navigation} />

                <View style={styles.error}>
                  <Text style={styles.errorMessage}>
                    An error occured: {f.error}
                  </Text>
                </View>
              </View>
            );
          }

          return (
            <View style={styles.form}>
              <Navigation style={styles.navigation} />

              <View style={styles.loading}>
                <View>
                  <ActivityIndicator size={48} color="#52A23E" />
                </View>
              </View>
            </View>
          );
        }}
      </FormConsumer>
    );
  }
}
