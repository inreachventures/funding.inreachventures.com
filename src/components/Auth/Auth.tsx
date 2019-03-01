import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {RouteComponentProps} from 'react-router';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import faEnvelope from '@fortawesome/fontawesome-free-solid/faEnvelope';
import faLinkedin from '@fortawesome/fontawesome-free-brands/faLinkedin';

import {colors} from '../../lib/theme';
import {apiHost, host} from '../../lib/config';

import Navigation from '../Navigation';
import Terms from '../Terms';

const liqs = new URLSearchParams({redirect: `${host}/form`} as any);

const styles = StyleSheet.create({
  container: {
    flex: 1
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
  authOption: {
    marginVertical: 8
  },
  authOptionText: {
    marginVertical: 4,
    marginHorizontal: 12
  },
  terms: {
    marginVertical: 12
  }
});

const navStyles = StyleSheet.create({
  view: {flex: 1, justifyContent: 'center'},
  text: {
    fontSize: 24,
    fontWeight: 'bold'
  }
});

const dividerStyles = StyleSheet.create({
  view: {
    margin: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  line: {
    flex: 1,
    height: 2,
    backgroundColor: colors.green
  },
  text: {
    marginHorizontal: 8,
    fontWeight: 'bold',
    fontSize: 18
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

const authLinkStyles = StyleSheet.create({
  view: {
    display: 'flex',
    padding: 12,
    margin: 4,
    borderRadius: 4,
    flexDirection: 'row'
  },
  icon: {
    color: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 18,
    marginRight: 8
  },
  text: {
    color: 'white',
    fontSize: 18,
    justifyContent: 'center',
    alignItems: 'center'
  },
  linkedIn: {
    backgroundColor: colors.blueLinkedIn
  },
  email: {
    backgroundColor: colors.blueDark
  }
});

type Props = RouteComponentProps<{}>;

export default class Auth extends React.Component<Props> {
  title = document.title;

  handleEmailPress = () => {
    this.props.history.push('/auth/email');
  };

  componentDidMount() {
    document.title = 'Auth | InReach Ventures';
  }

  componentWillUnmount() {
    document.title = this.title;
  }

  render() {
    return (
      <View style={[styles.container]}>
        <Navigation>
          <View style={navStyles.view}>
            <Text style={navStyles.text}>Sign in</Text>
          </View>
        </Navigation>

        <ScrollView
          style={styles.auth}
          contentContainerStyle={styles.authContentContainer}
        >
          <View style={styles.authContent}>
            <View style={headerStyles.view}>
              <Text style={headerStyles.text}>Sign in with email</Text>
            </View>
            <View style={headerStyles.view}>
              <Text style={headerStyles.text}>How shall we proceed?</Text>
            </View>

            <View style={styles.authOption}>
              <View
                {...{
                  accessibilityRole: 'link',
                  href: `${apiHost}/linkedin?${liqs}`
                }}
                style={[authLinkStyles.view, authLinkStyles.linkedIn]}
              >
                <Text style={authLinkStyles.icon}>
                  <FontAwesomeIcon icon={faLinkedin} />
                </Text>

                <Text style={[authLinkStyles.text]}>LinkedIn</Text>
              </View>

              <Text style={styles.authOptionText}>
                Get started faster by using your LinkedIn account. If this is
                your first time signing in, we will pre-fill some information
                &mdash; such as your name &mdash; to save you time.
              </Text>
            </View>

            <View style={dividerStyles.view}>
              <View style={dividerStyles.line} />
              <Text style={dividerStyles.text}>OR</Text>
              <View style={dividerStyles.line} />
            </View>

            <View style={styles.authOption}>
              <Text
                onPress={this.handleEmailPress}
                style={[authLinkStyles.view, authLinkStyles.email]}
              >
                <Text style={authLinkStyles.icon}>
                  <FontAwesomeIcon icon={faEnvelope} />
                </Text>

                <Text style={[authLinkStyles.text]}>Email</Text>
              </Text>

              <Text style={styles.authOptionText}>
                We will send you a link that takes you straight into your
                funding form.
              </Text>
            </View>
          </View>
        </ScrollView>

        <View style={styles.terms}>
          <Terms />
        </View>
      </View>
    );
  }
}
