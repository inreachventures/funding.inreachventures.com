import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Auth from './Auth';
import AuthEmail from './AuthEmail';
import Form from './Form';
import {FormProvider} from './FormContext';
import Me from './Me';
import Landing from './Landing';
import Onboarding from './Onboarding';
import RavenErrorBoundary from './RavenErrorBoundary';
import Success from './Success';
import TrackPageViews from './TrackPageViews';

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <RavenErrorBoundary>
          <FormProvider>
            <TrackPageViews>
              <Switch>
                <Route path="/" component={Landing} exact />

                <Route path="/auth" component={Auth} exact />
                <Route path="/auth/email" component={AuthEmail} exact />

                <Route path="/form/:section?" component={Form} exact />
                <Route path="/me" component={Me} exact />
                <Route path="/Onboarding" component={Onboarding} exact />
                <Route path="/success" component={Success} exact />
              </Switch>
            </TrackPageViews>
          </FormProvider>
        </RavenErrorBoundary>
      </Router>
    );
  }
}
