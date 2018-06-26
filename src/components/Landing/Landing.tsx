import React from 'react';
import {
  Button,
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import {RouteComponentProps} from 'react-router';
import {ifElse, compose, pathOr, trim, always, identity, isEmpty} from 'ramda';

import {FormConsumer} from '../FormContext';
import Terms from '../Terms';

import theme, {colors} from '../../lib/theme';
import logo from '../../images/logo.png';
import map from '../../images/map.png';

const styles = StyleSheet.create({
  main: {
    flex: 1
  },
  header: {
    flexShrink: 0,
    flexDirection: 'row'
  },
  headerLinks: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  headerLink: {
    ...theme.color.green,
    marginHorizontal: 16,
    fontSize: 18,
    textAlign: 'center'
  },
  content: {
    flex: 1
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  contentInner: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.75)',
    borderRadius: 16,
    shadowColor: 'white',
    shadowRadius: 32
  },
  logo: {
    margin: 16,
    borderRadius: 4
  },
  title: {
    ...theme.text.title,
    ...theme.color.green,
    fontSize: 48,
    textAlign: 'center',
    margin: 8
  },
  summary: {
    ...theme.color.greenMuted,
    margin: 16,
    fontSize: 20,
    textAlign: 'center'
  },
  getStarted: {
    width: 180,
    margin: 16
  },
  terms: {
    ...theme.color.greenMuted,
    fontSize: 12,
    margin: 8,
    textAlign: 'center'
  },
  link: {
    textDecorationLine: 'underline',
    color: colors.greenMuted
  }
});

type Props = RouteComponentProps<{}>;

export default class Landing extends React.Component<Props> {
  render() {
    return (
      <ImageBackground
        source={{uri: map}}
        style={styles.main}
        resizeMode="cover"
      >
        <SafeAreaView style={styles.header}>
          <Text
            style={styles.headerLink}
            {...{
              accessibilityRole: 'link',
              href: 'https://www.inreachventures.com',
              target: '_blank'
            }}
          >
            <Image
              source={{width: 120, height: 60, uri: logo}}
              resizeMode="contain"
              style={styles.logo}
            />
          </Text>

          <View style={styles.headerLinks}>
            <Text
              style={styles.headerLink}
              {...{
                accessibilityRole: 'link',
                href: 'https://www.inreachventures.com#portfolio',
                target: '_blank'
              }}
            >
              Our Portfolio
            </Text>
            <Text
              style={styles.headerLink}
              {...{
                accessibilityRole: 'link',
                href: 'https://www.inreachventures.com#about',
                target: '_blank'
              }}
            >
              About Us
            </Text>
          </View>
        </SafeAreaView>

        <ScrollView
          style={styles.content}
          contentContainerStyle={styles.contentContainer}
        >
          <SafeAreaView style={styles.contentInner}>
            <Text style={styles.title}>
              Apply for an investment in{' '}
              <FormConsumer>
                {(f) => {
                  const companyName = compose(
                    ifElse(isEmpty, always('your company'), identity),
                    trim,
                    pathOr('', [
                      'data',
                      'sections',
                      0,
                      'questions',
                      0,
                      'fields',
                      0,
                      'fields',
                      0,
                      'value'
                    ])
                  )(f);

                  return <Text>{companyName}</Text>;
                }}
              </FormConsumer>
            </Text>

            <Text style={styles.summary}>
              The questions we ask have been carefully crafted to create an
              accurate profile of your company.<br />From that, we will give you
              an investment decision &mdash; and feedback &mdash; within seven
              days.
            </Text>

            <FormConsumer>
              {(f) => {
                if (f.type === 'Success') {
                  return (
                    <View style={styles.getStarted}>
                      <Button
                        onPress={() => {
                          this.props.history.push('/form');
                        }}
                        title="get started"
                        color={colors.green}
                      />
                    </View>
                  );
                }

                return (
                  <View style={styles.getStarted}>
                    <Button
                      onPress={() => {
                        this.props.history.push('/auth');
                      }}
                      title="get started"
                      color={colors.green}
                    />
                  </View>
                );
              }}
            </FormConsumer>

            <Terms />
          </SafeAreaView>
        </ScrollView>
      </ImageBackground>
    );
  }
}
