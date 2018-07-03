import React from 'react';
import {StyleSheet, Text} from 'react-native';

import {colors} from '../lib/theme';

const styles = StyleSheet.create({
  terms: {
    color: colors.greenMuted,
    fontSize: 12,
    margin: 8,
    textAlign: 'center'
  },
  link: {
    color: colors.greenMuted,
    textDecorationLine: 'underline'
  }
});

export default class Terms extends React.Component {
  render() {
    return (
      <Text style={styles.terms}>
        By entering information (including where you partially complete any
        questions) you agree to our{' '}
        <Text
          style={styles.link}
          {...{
            accessibilityRole: 'link',
            href: 'https://www.inreachventures.com/legal/terms-and-conditions',
            title: 'Terms of Use',
            target: '_blank'
          }}
        >
          Terms of Use
        </Text>{' '}
        and the{' '}
        <Text
          style={styles.link}
          {...{
            accessibilityRole: 'link',
            href:
              'https://www.inreachventures.com/legal/inreach-data-privacy-notice',
            title: 'InReach Data Privacy Notice',
            target: '_blank'
          }}
        >
          InReach Data Privacy Notice
        </Text>
      </Text>
    );
  }
}
