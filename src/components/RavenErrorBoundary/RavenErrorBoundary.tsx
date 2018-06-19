import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Raven from 'raven-js';

import {colors} from '../../lib/theme';
import {environment, sentryDsn, gitRevision} from '../../lib/config';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  error: {
    maxWidth: 480,
    backgroundColor: colors.red,
    color: 'white',
    padding: 16,
    margin: 4,
    borderRadius: 4,
    fontSize: 18
  },
  errorMessage: {
    marginVertical: 16
  }
});

type State = {
  componentStack: string | null;
};

export default class RavenErrorBoundary extends React.Component<{}, State> {
  state = {
    componentStack: null
  };

  componentDidMount() {
    if (sentryDsn) {
      Raven.config(sentryDsn, {
        release: gitRevision,
        environment
      }).install();
    }
  }

  componentDidCatch(error: Error, {componentStack}: React.ErrorInfo) {
    this.setState({componentStack});

    if (Raven.isSetup()) {
      Raven.captureException(error, {
        extra: {
          componentStack
        }
      });

      Raven.showReportDialog();
    } else {
      console.error(error);
    }
  }

  render() {
    if (this.state.componentStack) {
      return (
        <View style={styles.wrapper}>
          <Text style={styles.error}>
            <View>
              <Text>An error occured</Text>
            </View>

            <View style={styles.errorMessage}>
              <Text>{this.state.componentStack}</Text>
            </View>

            <View>
              <Text>Reload the page and try again</Text>
            </View>
          </Text>
        </View>
      );
    }

    return this.props.children;
  }
}
