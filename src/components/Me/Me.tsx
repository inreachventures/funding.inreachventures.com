import React from 'react';
// import {ActivityIndicator, Button, StyleSheet, Text, View} from 'react-native';
import {Redirect, RouteComponentProps} from 'react-router';

// import Navigation from '../Navigation';

// const styles = StyleSheet.create({
//   me: {
//     flex: 1
//   },
//   loading: {
//     flex: 1,
//     justifyContent: 'center'
//   },
//   navigation: {
//     marginBottom: 32
//   },
//   profile: {
//     padding: 24,
//     alignItems: 'center'
//   },
//   email: {
//     margin: 8,
//     fontSize: 18,
//     textAlign: 'center'
//   },
//   controls: {
//     flexDirection: 'row',
//     justifyContent: 'center'
//   },
//   signOut: {
//     flexBasis: 240,
//     flexShrink: 1,
//     margin: 16
//   }
// });

type Props = RouteComponentProps<{}>;

export default class Me extends React.Component<Props> {
  title = document.title;

  componentDidMount() {
    document.title = 'Me | InReach Ventures';
  }

  componentWillUnmount() {
    document.title = this.title;
  }

  render() {
    // <View style={styles.me}>
    //   <Navigation />
    //
    //   <View style={styles.profile}>
    //     <Text style={styles.email}>Signed in as {profile.email}</Text>
    //   </View>
    //
    //   <View style={styles.controls}>
    //     <View style={styles.signOut}>
    //       <Button
    //         onPress={result.unauthorise}
    //         title="sign out"
    //         color="tomato"
    //       />
    //     </View>
    //   </View>
    // </View>

    return <Redirect to="/auth" />;
  }
}
