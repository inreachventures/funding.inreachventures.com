import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center'
  }
});

export default class Loading extends React.Component {
  render() {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size={48} color="#52A23E" />
      </View>
    );
  }
}
