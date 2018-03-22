import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import {withRouter, RouteComponentProps} from 'react-router';
import {keys, length, prop, chain, filter} from 'ramda';

import {Section} from '../../lib/section';
import {Question} from '../../lib/question';
import {Field} from '../../lib/field';
import {colors} from '../../lib/theme';

const styles = StyleSheet.create({
  overview: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  sections: {
    flexBasis: 480,
    flexShrink: 1
  },
  section: {
    shadowColor: colors.greenDark,
    shadowRadius: 4,
    borderRadius: 4,
    overflow: 'hidden',
    margin: 12
  },
  title: {
    fontSize: 24,
    color: colors.green,
    textAlign: 'center',
    marginTop: 24,
    marginBottom: 8
  },
  count: {
    fontSize: 18,
    color: colors.greenMuted,
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 24
  },
  progress: {
    backgroundColor: colors.green,
    height: 4
  }
});

function value(f: Field): string[] {
  return f.type === 'compound' || f.type === 'multiple'
    ? chain(value, f.fields)
    : !f.value && f.defaultValue
      ? []
      : [f.value];
}

const counts = (qs: Question[]) => {
  const fields = chain((q) => prop('fields', q), qs);

  const vs = chain(value, fields);

  const noQs = length(vs);
  const noAs = length(keys(filter(Boolean, vs)));

  return {qs: noQs, as: noAs};
};

type Props = RouteComponentProps<{}> & {
  sections: Section[];
};

class Overview extends React.Component<Props> {
  render() {
    const {sections, history} = this.props;

    return (
      <View style={styles.overview}>
        <View style={styles.sections}>
          <ScrollView>
            {sections.map((s) => {
              const {qs, as} = counts(s.questions);

              return (
                <TouchableHighlight
                  key={s.path}
                  onPress={() => history.push(`/form/${s.path}`)}
                  underlayColor="white"
                  style={styles.section}
                >
                  <View>
                    <Text style={styles.title}>{s.title}</Text>

                    <Text style={styles.count}>
                      {as} of {qs} answered
                    </Text>
                    <View
                      style={[styles.progress, {width: `${as / qs * 100}%`}]}
                    />
                  </View>
                </TouchableHighlight>
              );
            })}
          </ScrollView>
        </View>
      </View>
    );
  }
}

export default withRouter(Overview);
