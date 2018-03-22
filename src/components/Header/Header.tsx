import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {withRouter, RouteComponentProps} from 'react-router';

import theme, {colors} from '../../lib/theme';

const styles = StyleSheet.create({
  headerContainer: {
    marginTop: 24,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  header: {
    flexBasis: 840,
    flexShrink: 1,
    shadowColor: colors.greenMuted,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    shadowRadius: 4,
    shadowOpacity: 0.4,
    marginRight: 24,
    marginLeft: 24
  },
  title: {
    ...theme.text.subtitle,
    color: colors.greenMuted,
    padding: 18,
    textAlign: 'center'
  }
});

type Props = RouteComponentProps<{}> & {
  path: string;
  title: string;
};

function Header({path, title, history}: Props) {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.header}>
        <Text style={styles.title} onPress={() => history.push(path)}>
          {title}
        </Text>
      </View>
    </View>
  );
}

export default withRouter(Header);
