import React from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import {isEmpty} from 'ramda';

import {RouteComponentProps} from 'react-router';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import faEnvelope from '@fortawesome/fontawesome-free-solid/faEnvelope';

import {colors} from '../../lib/theme';
import * as auth from '../../api/auth';

import Navigation from '../Navigation';
import Terms from '../Terms';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    flex: 1,
    position: 'relative'
  },
  error: {
    position: 'absolute',
    backgroundColor: colors.red,
    width: '100%',
    padding: 12
  },
  errorMessage: {
    textAlign: 'center',
    color: 'white',
    fontSize: 18
  },
  auth: {
    paddingVertical: 32,
    paddingHorizontal: 12,
    flexDirection: 'row'
  },
  authContentContainer: {
    flexBasis: 640,
    flexShrink: 1,
    marginHorizontal: 'auto',
    marginVertical: 'auto'
  },
  authContent: {
    padding: 12,
    backgroundColor: colors.greenLightMuted,
    shadowRadius: 32,
    shadowColor: colors.greenDark,
    shadowOpacity: 0.4,
    borderRadius: 4
  },
  success: {
    margin: 8
  },
  cancel: {
    alignSelf: 'flex-start',
    marginTop: 16,
    marginHorizontal: 8,
    color: colors.greenDark,
    textDecorationLine: 'underline'
  }
});

const navStyles = StyleSheet.create({
  view: {flex: 1, justifyContent: 'center'},
  text: {
    fontSize: 24,
    fontWeight: 'bold'
  }
});

const headerStyles = StyleSheet.create({
  view: {
    padding: 12
  },
  text: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold'
  }
});

const inputStyles = StyleSheet.create({
  view: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 4,
    borderRadius: 4,
    marginHorizontal: 4,
    marginVertical: 8
  },
  label: {
    margin: 4
  },
  icon: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    fontSize: 18
  },
  input: {
    flex: 1,
    fontSize: 18,
    padding: 8,
    outline: 'none'
  } as any
});

const sendButtonStyles = StyleSheet.create({
  to: {
    margin: 4,
    borderRadius: 4,
    overflow: 'hidden'
  },
  view: {
    backgroundColor: colors.green,
    paddingHorizontal: 12,
    paddingVertical: 8
  },
  text: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white'
  }
});

type Props = RouteComponentProps<{}>;

type State =
  | {type: 'Initial'; email: string}
  | {type: 'Loading'; email: string}
  | {type: 'Failure'; email: string; error: string}
  | {type: 'Success'; email: string};

export default class Auth extends React.Component<Props, State> {
  state: State = {type: 'Initial', email: ''};

  title = document.title;

  controller = new AbortController();

  handleChangeEmail = (email: string) => {
    this.setState({type: 'Initial', email});
  };

  reset = () => {
    this.setState({type: 'Initial', email: ''});
  };

  cancel = () => {
    this.props.history.push('/auth');
  };

  sendLink = () => {
    const {email} = this.state;

    if (isEmpty(email.trim())) {
      this.setState({
        type: 'Failure',
        email,
        error: 'You must enter an email address'
      });

      return;
    }

    this.setState({type: 'Loading', error: null, email}, () => {
      auth
        .sendLink(email)
        .then(() => {
          if (!this.controller.signal.aborted) {
            this.setState({type: 'Success', email});
          }
        })
        .catch(() => {
          if (!this.controller.signal.aborted) {
            this.setState({
              type: 'Failure',
              error: 'Could not send link. Try again.',
              email
            });
          }
        });
    });
  };

  componentDidMount() {
    document.title = 'Sign in with Email | InReach Ventures';
  }

  componentWillUnmount() {
    document.title = this.title;

    this.controller.abort();
  }

  render() {
    return (
      <View style={styles.container}>
        <Navigation>
          <View style={navStyles.view}>
            <Text style={navStyles.text}>Sign in</Text>
          </View>
        </Navigation>

        <View style={styles.content}>
          {this.state.type === 'Failure' ? (
            <View style={styles.error}>
              <Text style={styles.errorMessage}>{this.state.error}</Text>
            </View>
          ) : null}

          <ScrollView
            style={styles.auth}
            contentContainerStyle={styles.authContentContainer}
          >
            <View style={styles.authContent}>
              <View style={headerStyles.view}>
                <Text style={headerStyles.text}>
                  Where should we send the link?
                </Text>
              </View>

              <Text style={inputStyles.label}>Email address</Text>
              <View style={inputStyles.view}>
                <Text style={inputStyles.icon}>
                  <FontAwesomeIcon icon={faEnvelope} />
                </Text>
                <TextInput
                  accessibilityLabel="email address to receive sign in link"
                  style={inputStyles.input}
                  onChangeText={this.handleChangeEmail}
                  onSubmitEditing={this.sendLink}
                  value={this.state.email}
                  placeholder="mail@example.com"
                  keyboardType="email-address"
                />
              </View>

              {this.state.type === 'Success' ? (
                <View style={styles.success}>
                  <Text>
                    A link has been sent to {this.state.email}. Check your
                    inbox.
                  </Text>
                </View>
              ) : null}

              {this.state.type === 'Success' ? (
                <TouchableOpacity
                  style={sendButtonStyles.to}
                  activeOpacity={0.8}
                  onPress={this.reset}
                >
                  <View style={sendButtonStyles.view}>
                    <Text style={sendButtonStyles.text}>Send another</Text>
                  </View>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={sendButtonStyles.to}
                  activeOpacity={0.8}
                  onPress={this.sendLink}
                >
                  <View style={sendButtonStyles.view}>
                    {this.state.type === 'Loading' ? (
                      <ActivityIndicator size={22} color="white" />
                    ) : (
                      <Text style={sendButtonStyles.text}>Send link</Text>
                    )}
                  </View>
                </TouchableOpacity>
              )}

              <Text style={styles.cancel} onPress={this.cancel}>
                Cancel
              </Text>
            </View>
          </ScrollView>
        </View>
        <Terms />
      </View>
    );
  }
}
