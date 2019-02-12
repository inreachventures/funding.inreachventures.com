import React from 'react';
import {
  ActivityIndicator,
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
import {History} from 'history';
import {ifElse, compose, pathOr, trim, always, identity, isEmpty} from 'ramda';

import {FormConsumer} from '../FormContext';
import Terms from '../Terms';

import theme, {colors} from '../../lib/theme';
import {Form} from '../../lib/form';
import {RemoteData} from '../../lib/remoteData';
import logo from '../../images/logo.png';
import map from '../../images/map.png';

const styles = StyleSheet.create({
  main: {
    flex: 1
  },
  header: {
    flexShrink: 0,
    flexDirection: 'row',
    height: '80px',
    padding: '12px'
  },
  headerLinks: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  headerLink: {
    ...theme.color.primary,
    ...theme.font.roboto,
    fontSize: 16,
    textAlign: 'center',
    width: '140px'
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
    maxWidth: 768,
    flexShrink: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.75)',
    borderRadius: 16,
    shadowColor: 'white',
    shadowRadius: 32
  },
  logo: {
    margin: 12
  },
  title: {
    ...theme.text.title,
    ...theme.color.primary,
    ...theme.font.roboto,
    fontSize: 42,
    textAlign: 'center',
    marginBottom: 12
  },
  summary: {
    ...theme.color.greyOne,
    ...theme.font.roboto,
    fontSize: 20,
    lineHeight: 26,
    fontWeight: 400,
    textAlign: 'center'
  },
  getStarted: {
    width: 280,
    marginTop: 48
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
);

type RemoteForm = RemoteData<string, Form>;

type GetStartedButtonProps = {
  form: RemoteForm;
  history: History;
};

function GetStartedButton({form, history}: GetStartedButtonProps) {
  if (form.type === 'NotAsked' || form.type === 'Loading') {
    return <ActivityIndicator size={24} />;
  }

  return (
    <View style={styles.getStarted}>
      <Button
        onPress={() => {
          history.push(form.type === 'Success' ? '/form' : '/auth');
        }}
        title="get started"
        color={colors.green}
      />
    </View>
  );
}

type GetStartedTitleProps = {
  form: RemoteForm;
};

function GetStartedTitle({form}: GetStartedTitleProps) {
  if (form.type === 'Success') {
    return <Text style={styles.title}>Tell us about {companyName(form)}</Text>;
  }

  if (form.type === 'Failure') {
    return <Text style={styles.title}>Looking for investment?</Text>;
  }

  return <ActivityIndicator size={32} />;
}

type GetStartedSummaryProps = {
  form: RemoteForm;
};

function GetStartedSummary({form}: GetStartedSummaryProps) {
  return (
    <Text style={styles.summary}>
      Answer our questions and produce an executive summary of{' '}
      {companyName(form)}. From this, we&rsquo;ll give you an investment
      decision &mdash; and feedback &mdash; within 3 days.
    </Text>
  );
}

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
              href: 'https://www.inreachventures.com'
            }}
          >
            <Image
              source={{width: 144, height: 56, uri: logo}}
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
              Portfolio
            </Text>
            <Text
              style={styles.headerLink}
              {...{
                accessibilityRole: 'link',
                href: 'https://www.inreachventures.com#team',
                target: '_blank'
              }}
            >
              Team
            </Text>
            <Text
              style={styles.headerLink}
              {...{
                accessibilityRole: 'link',
                href: 'https://www.inreachventures.com#news',
                target: '_blank'
              }}
            >
              News
            </Text>
            <Text
              style={styles.headerLink}
              {...{
                accessibilityRole: 'link',
                href: 'https://www.inreachventures.com#blog',
                target: '_blank'
              }}
            >
              Blog
            </Text>
            <Text
              style={styles.headerLink}
              {...{
                accessibilityRole: 'link',
                href: 'https://library.inreachventures.com/',
                target: '_blank'
              }}
            >
              Library
            </Text>
          </View>
        </SafeAreaView>

        <ScrollView
          style={styles.content}
          contentContainerStyle={styles.contentContainer}
        >
          <SafeAreaView style={styles.contentInner}>
            <FormConsumer>
              {(f) => (
                <React.Fragment>
                  <GetStartedTitle form={f} />

                  <GetStartedSummary form={f} />

                  <GetStartedButton form={f} history={this.props.history} />
                </React.Fragment>
              )}
            </FormConsumer>
          </SafeAreaView>
        </ScrollView>
        <Terms />
      </ImageBackground>
    );
  }
}
