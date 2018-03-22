import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {RouteComponentProps} from 'react-router';

import {colors} from '../../lib/theme';

const styles = StyleSheet.create({
  onboarding: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

type Props = RouteComponentProps<{}>;

export default class Onboarding extends React.Component<Props> {
  okay = () => {
    this.props.history.push('/form');
  };

  render() {
    return (
      <View style={styles.onboarding}>
        <Text>Onboarding message goes here</Text>
        <Button title="okay" onPress={this.okay} color={colors.green} />
      </View>
    );
  }
}
