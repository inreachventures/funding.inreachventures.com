import React from 'react';
import {
  StyleSheet,
  TouchableHighlight,
  Text,
  View,
  ScrollView,
  GestureResponderEvent
} from 'react-native';
import {Route, withRouter, RouteComponentProps} from 'react-router';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import faHome from '@fortawesome/fontawesome-free-solid/faHome';

import {colors} from '../../lib/theme';

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 8,
    shadowColor: colors.greenLightMuted,
    shadowRadius: 16,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  navigation: {
    flexBasis: 960,
    flexShrink: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 'env(safe-area-inset-left)',
    paddingRight: 'env(safe-area-inset-right)'
  },
  iconLink: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12
  },
  icon: {
    color: colors.green,
    fontSize: 24,
    paddingVertical: 6,
    paddingHorizontal: 12
  },
  links: {
    flexGrow: 1,
    justifyContent: 'space-around'
  },
  link: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 4,
    paddingHorizontal: 12,
    borderBottomWidth: 4,
    borderBottomColor: 'transparent'
  },
  linkActive: {
    borderBottomColor: colors.green
  },
  linkLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.green
  }
});

type Link = {
  href: string;
  label: string;
};

type NavItemProps = {
  link: Link;
  active: boolean;
};

function NavItem({link, active}: NavItemProps) {
  return (
    <Route>
      {({history}) => (
        <TouchableHighlight
          key={link.href}
          style={active ? [styles.link, styles.linkActive] : styles.link}
          onPress={() => history.push(`/form/${link.href}`)}
          underlayColor="transparent"
          activeOpacity={0.7}
        >
          <Text style={styles.linkLabel}>{link.label}</Text>
        </TouchableHighlight>
      )}
    </Route>
  );
}

type NavigationProps = RouteComponentProps<{section: string}> & {
  style?: object;
  links?: Link[];
};

class Navigation extends React.Component<NavigationProps> {
  title: string = document.title;

  setTitle = () => {
    const {
      match: {
        params: {section}
      },
      links
    } = this.props;

    if (section && links) {
      const l = links.find((l) => l.href.endsWith(section));
      if (l) {
        document.title = `${l.label} | InReach Ventures`;
      }
    } else {
      document.title = this.title;
    }
  };

  goHome = (e: GestureResponderEvent) => {
    e.preventDefault();

    this.props.history.push('/');
  };

  componentDidUpdate() {
    this.setTitle();
  }

  componentWillUnmount() {
    document.title = this.title;
  }

  render() {
    const {match, links, style = {}} = this.props;

    return (
      <View style={[styles.wrapper, style]}>
        <View style={styles.navigation}>
          <TouchableHighlight
            style={styles.iconLink}
            onPress={this.goHome}
            underlayColor="transparent"
            activeOpacity={0.7}
          >
            <Text style={styles.icon}>
              <FontAwesomeIcon icon={faHome} />
            </Text>
          </TouchableHighlight>

          {links ? (
            <ScrollView horizontal={true} contentContainerStyle={styles.links}>
              {links.map((l) => (
                <NavItem
                  key={l.href}
                  link={l}
                  active={l.href === match.params.section}
                />
              ))}
            </ScrollView>
          ) : null}
        </View>
      </View>
    );
  }
}

export default withRouter(Navigation);
