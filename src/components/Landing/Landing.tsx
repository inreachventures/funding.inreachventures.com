import React from 'react';
import {
  ActivityIndicator,
  Button,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import {RouteComponentProps} from 'react-router';
import {History} from 'history';

import {FormConsumer} from '../FormContext';
import Terms from '../Terms';

import theme, {colors} from '../../lib/theme';
import {Form} from '../../lib/form';
import {RemoteData} from '../../lib/remoteData';
import logo from '../../images/logo.png';
import aaron from '../../images/aaron.png';
import {IntercomMessenger} from '../IntercomMessenger';

const styles = StyleSheet.create({
  main: {
    flex: 1
  },
  header: {
    flexShrink: 0,
    flexDirection: 'row',
    height: '80px',
    padding: '12px',
    backgroundColor: 'rgb(248,248,248)'
  },
  logo: {
    margin: 20
  },
  content: {
    flex: 1
  },
  contentHeader: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'column',
    minHeight: 350,
    backgroundColor: 'rgb(248,248,248)'
  },
  title: {
    ...theme.text.title,
    ...theme.color.primary,
    ...theme.font.roboto,
    fontSize: 38,
    textAlign: 'center',
    marginBottom: 12,
    paddingTop: 50
  },
  getStarted: {
    width: 240,
    padding: 20
  },
  summary: {
    ...theme.color.greyOne,
    ...theme.font.roboto,
    fontSize: 12,
    lineHeight: 18,
    fontWeight: 400,
    textAlign: 'center',
    maxWidth: 520,
    paddingBottom: 50
  },
  contentCopy: {
    alignItems: 'center',
    marginBottom: 28
  },
  contentCopyText: {
    maxWidth: 720,
    marginLeft: 60,
    marginRight: 20
  },
  contentReview: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 48,
    marginBottom: 48,
    maxWidth: 720,
    backgroundColor: 'rgb(248,248,248)',
    minHeight: 200,
    paddingRight: 20,
    paddingBottom: 20
  },
  contentReviewText: {
    flex: 3,
    marginBottom: 20
  },
  contentReviewImage: {
    flex: 1,
    minWidth: 150,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textCopy: {
    ...theme.color.greyOne,
    fontSize: 16,
    lineHeight: 20,
    marginTop: 10
  },
  textFAQ: {
    ...theme.color.greyOne,
    fontSize: 16,
    lineHeight: 20,
    marginTop: 10,
    fontWeight: 500
  },
  textTitle: {
    ...theme.color.greyOne,
    fontSize: 18,
    fontWeight: 650,
    marginBottom: 12,
    marginTop: 42
  },
  textReview: {
    ...theme.color.greyOne,
    fontSize: 16,
    lineHeight: 20,
    marginTop: 10,
    fontStyle: 'italic'
  },
  terms: {
    ...theme.color.greenMuted,
    fontSize: 12,
    margin: 20,
    textAlign: 'center'
  },
  link: {
    textDecorationLine: 'underline',
    color: colors.greenMuted
  }
});

type RemoteForm = RemoteData<string, Form>;

type GetStartedButtonProps = {
  form: RemoteForm;
  history: History;
};

function GetStartedButton({form, history}: GetStartedButtonProps) {
  if (form.type === 'NotAsked' || form.type === 'Loading') {
    return <ActivityIndicator size={24} color="#52A23E" />;
  }

  return (
    <View style={styles.getStarted}>
      <Button
        onPress={() => {
          history.push(form.type === 'Success' ? '/form' : '/auth');
        }}
        title="get started"
        color={'#0068A4'}
      />
    </View>
  );
}

type Props = RouteComponentProps<{}>;

export default class Landing extends React.Component<Props> {
  render() {
    return (
      <SafeAreaView
        // source={{uri: map}}
        style={styles.main}
      >
        <ScrollView style={styles.content}>
          <SafeAreaView style={styles.header}>
            <Text
              {...{
                accessibilityRole: 'link',
                href: 'https://www.inreachventures.com',
                target: '__blank'
              }}
            >
              <Image
                source={{width: 144, height: 56, uri: logo}}
                resizeMode="contain"
                style={styles.logo}
              />
            </Text>
          </SafeAreaView>

          <SafeAreaView style={styles.contentHeader}>
            <Text style={styles.title}>
              Engage with a partner
              <br />
              Get an answer in the next 3 days
            </Text>
            <FormConsumer>
              {(f) => (
                <React.Fragment>
                  <GetStartedButton form={f} history={this.props.history} />
                </React.Fragment>
              )}
            </FormConsumer>
            <Text style={styles.summary}>
              All the data which we collect through the process will be reviewed
              by a partner, treated as confidential, and kept in-house solely to
              assist our qualification process.
            </Text>
          </SafeAreaView>

          <SafeAreaView style={styles.contentCopy}>
            <SafeAreaView style={styles.contentCopyText}>
              <Text style={styles.textTitle}>
                The best way to engage with a partner
              </Text>
              <Text style={styles.textCopy}>
                Over the years, we have come to realize how difficult it can be
                for entrepreneurs to pitch their startups to investors. The
                process with traditional VCs firms can be long and opaque.
              </Text>
              <Text style={styles.textCopy}>
                The funding questionnaire is the easiest and fastest way to
                engage with us - InReach Ventures - and help assess how we could
                work together.
              </Text>
              <Text style={styles.textCopy}>
                We try to be as efficient as possible with our process, as we
                don’t want to waste any entrepreneur’s time, allowing them to
                focus on growing their business. When we like an investment
                opportunity, it can take as little as a week to issue a term
                sheet.
              </Text>
              <Text style={styles.textTitle}>
                Even if you are not fundraising at the moment
              </Text>
              <Text style={styles.textCopy}>
                The structure and questions of the funding questionnaire follow
                the exact format VCs use to review your startup, before ever
                having a meeting.
              </Text>
              <Text style={styles.textCopy}>
                The funding questionnaire will help you better understand your
                business, including the most important information investors are
                looking for.
              </Text>
              <Text style={styles.textCopy}>
                It's never too early: this is about building a relationship for
                when the time is right.
              </Text>
            </SafeAreaView>

            <SafeAreaView style={styles.contentReview}>
              <SafeAreaView style={styles.contentReviewImage}>
                <Image
                  resizeMode="contain"
                  source={{width: 150, height: 150, uri: aaron}}
                />
              </SafeAreaView>
              <SafeAreaView style={styles.contentReviewText}>
                <Text style={styles.textTitle}>
                  Aaron Joyce, Co-Founder of Traitly
                </Text>

                <Text style={styles.textReview}>
                  « We had started approaching a few local investors for
                  funding, but we were not having much luck getting through,
                  just talking to the junior guys. Then InReach emailed us.
                </Text>
                <Text style={styles.textReview}>
                  I was suspicious at the beginning, here was this partner
                  contacting me. I would never have thought we had a chance of
                  raising money with someone of his calibre. It is a much more
                  meritocratic way of investing.
                </Text>
                <Text style={styles.textReview}>
                  It’s not who you know or where you went to school. »
                </Text>
                <Text style={styles.textReview}>
                  <a
                    style={{color: 'green', textDecoration: 'none'}}
                    href={
                      'https://www.ft.com/content/dd7fa798-bfcd-11e7-823b-ed31693349d3'
                    }
                    target={'_blank'}
                  >
                    Read the full article on the Financial Times
                  </a>
                </Text>
              </SafeAreaView>
            </SafeAreaView>

            <FormConsumer>
              {(f) => (
                <React.Fragment>
                  <GetStartedButton form={f} history={this.props.history} />
                </React.Fragment>
              )}
            </FormConsumer>

            <SafeAreaView style={styles.contentCopyText}>
              <Text style={styles.textTitle}>Frequently Asked Questions</Text>

              <Text style={styles.textFAQ}>Who are InReach Ventures?</Text>
              <Text style={styles.textCopy}>
                We are a venture capital firm based in London, focused on
                investing in early stage startups across Europe. Our mission is
                to uncover and fund game-changing technology and use our AI
                powered software to discover early stage tech companies earlier
                and faster.
              </Text>
              <br />

              <Text style={styles.textFAQ}>
                What is different about InReach Ventures?
              </Text>
              <Text style={styles.textCopy}>
                We are revolutionising the traditional venture capital approach
                by using software and machine learning algorithms to identify
                the most promising investment opportunities emanating from
                across Europe. We know entrepreneurs are very busy running their
                day-to-day business and therefore we proactively reach out to
                entrepreneurs to assess potential investment opportunities in an
                efficient manner.
              </Text>
              <br />

              <Text style={styles.textFAQ}>What is the team’s background?</Text>
              <Text style={styles.textCopy}>
                The team has built up over 25 years of experience in start-ups
                and technology. Between us, we have actively been involved in
                the startup ecosystem in Europe and the US, both as investors
                and operators.
              </Text>
              <Text style={styles.textCopy}>
                In particular, prior to InReach Ventures,{' '}
                <a
                  target={'_blank'}
                  href={'https://www.linkedin.com/in/bonanzinga/'}
                >
                  Roberto Bonanzinga
                </a>{' '}
                (InReach Investment Partner) was an investor in companies, such
                as Wooga in Berlin (acquired by Playtika), Depop in
                Milan/London, Contentful in Berlin, Lifecake in London (acquired
                by Canon), Vivino in Copenhagen, SaatchiArt in London/Los
                Angeles (acquired by Leaf Group) , Friend.ly in Palo Alto, CA
                (acquired by Facebook), Mixtent in Palo Alto, CA (acquired by
                Facebook), Ban.jo in Redwood City CA, Tictail in Stockholm
                (acquired by Shopify).
              </Text>
              <br />

              <Text style={styles.textFAQ}>What is your ticket size?</Text>
              <Text style={styles.textCopy}>
                When we invest, our first cheque ranges from between €300k and
                €2M. Depending on the circumstances, we are very happy to lead,
                co-lead or follow a lead investor in an investment round.
              </Text>
              <br />

              <Text style={styles.textFAQ}>
                How long does our investment process take from start to finish?
              </Text>
              <Text style={styles.textCopy}>
                Once you complete the questionnaire, you will receive an
                investment decision from our investment partner in the next 3
                days. We try to be as efficient as possible with our process, as
                we don’t want to waste any entrepreneur’s time, allowing them to
                focus on growing their business. When we like an investment
                opportunity, it can take as little as a week to issue a term
                sheet. From then, the legal process to closing/funding typically
                takes 3-4 weeks.
              </Text>
              <br />

              <Text style={styles.textFAQ}>
                Why answer the questions in the online funding questionnaire?
              </Text>
              <Text style={styles.textCopy}>
                The funding questionnaire enables us to quickly assess a
                potential fit with a startup and offers more precise feedback on
                what the next steps should be. Even if you are not actively
                fundraising, we use the funding questionnaire as a way to
                understand some basic information about your startup and give
                the founders guidance and support. It also allows us to
                establish contact and facilitate future interactions.
              </Text>
              <br />

              <Text style={styles.textFAQ}>How do you deal with data?</Text>
              <Text style={styles.textCopy}>
                All the data which we collect through the process
                is reviewed by a partner and kept in-house solely to assist our
                qualification process. This data is not shared with any third
                parties or people outside of the InReach Ventures team or our
                trusted partners. Please see our{' '}
                <a
                  href={
                    'https://www.inreachventures.com/legal/inreach-data-privacy-notice/'
                  }
                  target={'_blank'}
                >
                  data privacy notice
                </a>{' '}
                for further details.
              </Text>
            </SafeAreaView>
          </SafeAreaView>
          <Terms />
        </ScrollView>
      </SafeAreaView>
    );
  }
}
