import React from 'react';
import {ScrollView, StyleSheet, Text, View, SafeAreaView} from 'react-native';

import {FormConsumer} from '../FormContext';
import Question from '../Question';

import {Section as TSection} from '../../lib/section';
import {Path} from '../../lib/path';
import {colors} from '../../lib/theme';

const styles = StyleSheet.create({
  section: {
    flex: 1
  },
  title: {
    fontSize: 24,
    color: colors.green,
    fontWeight: 'bold',
    marginVertical: 8,
    marginHorizontal: 8,
    textAlign: 'center'
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  navigationControls: {
    flexBasis: 680,
    flexShrink: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderColor: colors.greenLightMuted
  },
  back: {
    marginRight: 'auto'
  },
  next: {
    marginLeft: 'auto'
  },
  questionsScrollView: {
    maxWidth: 640,
    marginHorizontal: 'auto',
    paddingHorizontal: 24
  },
  questionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingBottom: 16
  },
  question: {
    flexBasis: 640,
    flexShrink: 1,
    marginVertical: 16
  }
});

type Props = {
  back?: React.ReactNode;
  next?: React.ReactNode;
  section: TSection;
  path: Path;
};

export default class Section extends React.Component<Props> {
  scrollView!: ScrollView;

  componentDidUpdate(prevProps: Props) {
    if (prevProps.section.path !== this.props.section.path) {
      this.scrollView.scrollTo({x: 0, y: 0, animated: true});
    }
  }

  render() {
    const {
      path,
      section: {questions, title},
      back,
      next
    } = this.props;

    return (
      <FormConsumer>
        {(f) => {
          if (f.type === 'Success') {
            return (
              <SafeAreaView style={styles.section}>
                <View style={styles.navigation}>
                  <View style={styles.navigationControls}>
                    <View style={styles.back}>{back}</View>

                    <Text style={styles.title}>{title}</Text>

                    <View style={styles.next}>{next}</View>
                  </View>
                </View>

                <ScrollView
                  style={styles.questionsScrollView}
                  contentContainerStyle={styles.questionsContainer}
                  ref={(el) => (this.scrollView = el as any)}
                >
                  {questions.map((question, i) => (
                    <View key={question.title} style={styles.question}>
                      <Question
                        question={question}
                        path={[...path, i]}
                        onChange={f.data.update}
                      />
                    </View>
                  ))}
                </ScrollView>
              </SafeAreaView>
            );
          }

          return null;
        }}
      </FormConsumer>
    );
  }
}
