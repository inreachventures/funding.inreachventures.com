import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View
} from 'react-native';
import {RouteComponentProps} from 'react-router';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import faEnvelope from '@fortawesome/fontawesome-free-solid/faEnvelope';
import faLinkedin from '@fortawesome/fontawesome-free-brands/faLinkedin';

import Navigation from '../Navigation';
import Terms from '../Terms';

import {apiHost} from '../../lib/config';
import * as auth from '../../api/auth';
import {colors} from '../../lib/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  inner: {
    maxWidth: 640,
    flexShrink: 1,
    flexWrap: 'wrap',
    marginHorizontal: 'auto'
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    margin: 8
  },
  explanation: {
    marginVertical: 16,
    fontSize: 18,
    marginHorizontal: 8
  },
  controls: {
    marginVertical: 16,
    borderRadius: 8,
    overflow: 'hidden',
    marginHorizontal: 8
  },
  labelWithIcon: {
    flexDirection: 'row'
  },
  envelope: {
    backgroundColor: colors.blueDark,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 22,
    padding: 16,
    color: 'white'
  },
  linkedIn: {
    backgroundColor: colors.blueLinkedIn,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 22,
    padding: 16,
    color: 'white',
    textAlign: 'center',
    marginBottom: 32
  },
  emailLabel: {
    flex: 1,
    backgroundColor: colors.blueDark,
    padding: 16,
    fontSize: 22,
    color: 'white'
  },
  emailInput: {
    margin: 0,
    backgroundColor: colors.blueDark,
    fontSize: 22,
    padding: 16,
    color: 'white'
  },
  loading: {
    backgroundColor: colors.blueLight,
    padding: 16
  },
  doneLabel: {
    backgroundColor: colors.green,
    padding: 16
  },
  sendLabel: {
    backgroundColor: colors.green,
    padding: 16
  },
  buttonLabelText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center'
  },
  error: {
    zIndex: 0,
    color: 'white',
    backgroundColor: 'tomato',
    fontSize: 22,
    padding: 12,
    textAlign: 'center'
  }
});

type Props = RouteComponentProps<{}>;

type State =
  | {status: 'Initial'; email: string}
  | {status: 'Loading'; email: string}
  | {status: 'Failure'; email: string; error: string}
  | {status: 'Success'; email: string};

export default class Auth extends React.Component<Props, State> {
  title = document.title;

  state: State = {status: 'Initial', email: ''};

  private email!: TextInput;

  linkedIn = () => {
    this.props.history.push('/linkedin');
  };

  signIn = () => {
    const {email} = this.state;

    if (!email.trim()) {
      this.setState({
        status: 'Failure',
        error: 'You must enter an email address',
        email
      });

      return;
    }

    this.setState({status: 'Loading'}, () => {
      auth
        .sendLink(email)
        .then(() => {
          this.setState({status: 'Success', email: ''});
        })
        .catch(() => {
          this.setState({
            status: 'Failure',
            error: 'Sending the link failed. Please try again.',
            email
          });
        });
    });
  };

  handleEmailLabelPress = () => {
    this.email.focus();
  };

  handleChangeEmail = (email: string) => {
    this.setState({status: 'Initial', email, error: ''});
  };

  componentDidMount() {
    document.title = 'Auth | InReach Ventures';
  }

  componentWillUnmount() {
    document.title = this.title;
  }

  render() {
    return (
      <View style={styles.container}>
        <Navigation />

        {this.state.status === 'Failure' ? (
          <Text style={styles.error}>{this.state.error}</Text>
        ) : null}

        <View style={styles.inner}>
          <Text style={styles.header}>How do you want to sign in?</Text>

          <Text style={styles.explanation}>
            Save time by letting us pre-fill information &ndash; such as your
            name &ndash; from your LinkedIn profile.
          </Text>

          <Text
            style={styles.linkedIn}
            {...{
              accessibilityRole: 'link',
              href: `${apiHost}/linkedin`
            }}
          >
            <FontAwesomeIcon icon={faLinkedin} /> Sign in with LinkedIn
          </Text>

          <Text style={styles.explanation}>
            Enter your email address and we will send you a link to get into
            your form.
          </Text>

          <View style={styles.controls}>
            <View style={styles.labelWithIcon}>
              <Text style={styles.envelope}>
                <FontAwesomeIcon icon={faEnvelope} />
              </Text>

              <Text
                style={styles.emailLabel}
                onPress={this.handleEmailLabelPress}
              >
                Email address
              </Text>
            </View>
            <TextInput
              style={styles.emailInput}
              ref={(el) => (this.email = el as any)}
              onChangeText={this.handleChangeEmail}
              placeholder="name@example.com"
              keyboardType="email-address"
              editable={this.state.status === 'Initial'}
            />

            {this.state.status === 'Loading' ? (
              <View style={styles.loading}>
                <ActivityIndicator color="white" size={26} />
              </View>
            ) : this.state.status === 'Success' ? (
              <View style={styles.doneLabel}>
                <Text style={styles.buttonLabelText}>Link sent</Text>
              </View>
            ) : (
              <TouchableHighlight onPress={this.signIn}>
                <View style={styles.sendLabel}>
                  <Text style={styles.buttonLabelText}>Send</Text>
                </View>
              </TouchableHighlight>
            )}
          </View>
        </View>

        <Terms />
      </View>
    );
  }
}
