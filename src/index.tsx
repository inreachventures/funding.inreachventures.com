import {AppRegistry, StyleSheet} from 'react-native';

import App from './components/App';

AppRegistry.registerComponent('App', () => App);

const styles = StyleSheet.create({
  app: {
    flex: 1
  }
});

AppRegistry.runApplication('App', {
  initialProps: {
    style: styles.app
  },
  rootTag: document.getElementById('root')
});

// Hot Module Replacement
if (module.hot) {
  module.hot.accept();
}
