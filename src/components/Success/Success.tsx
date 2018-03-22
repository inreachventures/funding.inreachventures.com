import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {RouteComponentProps} from 'react-router';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCheckCircle} from '@fortawesome/fontawesome-free-solid';

import Navigation from '../Navigation';

import {colors} from '../../lib/theme';
import {host} from '../../lib/config';

const styles = StyleSheet.create({
  success: {
    flex: 1
  },
  content: {
    maxWidth: '640',
    marginHorizontal: 'auto',
    justifyContent: 'center'
  },
  message: {
    padding: 24
  },
  title: {
    fontSize: 36,
    textAlign: 'center'
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
    paddingVertical: 16
  },
  link: {
    color: colors.green,
    textDecorationLine: 'underline'
  },
  icon: {
    textAlign: 'center',
    color: colors.green,
    fontSize: 96,
    margin: 24
  },
  done: {
    justifyContent: 'center',
    marginVertical: 12,
    marginHorizontal: 48
  }
});

type Props = RouteComponentProps<{}>;

export default class Me extends React.Component<Props> {
  title: string = document.title;

  componentDidMount() {
    document.title = 'Success | InReach Ventures';
  }

  componentWillUnmount() {
    document.title = this.title;
  }

  render() {
    const {history} = this.props;

    return (
      <View style={styles.success}>
        <Navigation />

        <View style={styles.content}>
          <View style={styles.message}>
            <Text style={styles.title}>Submitted!</Text>

            <Text style={styles.icon}>
              <FontAwesomeIcon icon={faCheckCircle} />
            </Text>

            <Text style={styles.text}>
              Thank you for sharing. We will now study your information to make
              an investment decision and give you some (hopefully) useful
              feedback.
            </Text>

            <Text style={styles.text}>
              You can come back at any time to make changes to your answers
              using the link in the email that we sent you. If you cannot find
              the link, it has expired, or gremlins ate the email, you can{' '}
              <Text
                style={styles.link}
                {...{
                  accessibilityRole: 'link',
                  href: `${host}/auth`,
                  title: 'Terms of Use',
                  target: '_blank'
                }}
              >
                ask for a new one
              </Text>.
            </Text>
          </View>

          <View style={styles.done}>
            <View>
              <Button
                title="done"
                onPress={() => {
                  history.push('/form');
                }}
                color={colors.green}
              />
            </View>
          </View>
        </View>
      </View>
    );
  }
}
