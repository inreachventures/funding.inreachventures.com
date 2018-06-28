import React from 'react';
import {Button, ScrollView, StyleSheet, Text, View} from 'react-native';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import faCheckCircle from '@fortawesome/fontawesome-free-solid/faCheckCircle';

import Navigation from '../Navigation';

import {colors} from '../../lib/theme';

const styles = StyleSheet.create({
  success: {
    flex: 1
  },
  content: {
    maxWidth: 640,
    marginHorizontal: 'auto'
  },
  message: {
    padding: 24
  },
  title: {
    fontSize: 28,
    textAlign: 'center'
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
    paddingVertical: 16
  },
  icon: {
    textAlign: 'center',
    color: colors.green,
    fontSize: 96,
    margin: 12
  },
  done: {
    justifyContent: 'center',
    marginVertical: 12,
    marginHorizontal: 48
  }
});

type Props = {
  dismiss(): void;
};

export default class Success extends React.Component<Props> {
  title: string = document.title;

  render() {
    const {dismiss} = this.props;

    return (
      <View style={styles.success}>
        <Navigation />

        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.message}>
            <Text style={styles.title}>You&rsquo;re done!</Text>

            <Text style={styles.icon}>
              <FontAwesomeIcon icon={faCheckCircle} />
            </Text>

            <Text style={styles.text}>
              Thank you for sharing. We will now evaluate your answers to make
              an investment decision and give you some (hopefully) useful
              feedback.
            </Text>

            <Text style={styles.text}>
              Come back at any time to change your answers. If we sent you a
              link via email, click that to pick up where you left off.
              Otherwise, you can use your LinkedIn account or ask for a link
              that will get you in.
            </Text>
          </View>

          <View style={styles.done}>
            <View>
              <Button title="done" onPress={dismiss} color={colors.green} />
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}
