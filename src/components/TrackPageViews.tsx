import React from 'react';
import GA from 'react-ga';
import {RouteComponentProps, withRouter} from 'react-router';

if (process.env.NODE_ENV === 'production') {
  GA.initialize('UA-67206679-5');
}

type Props = RouteComponentProps<{}> & {
  options?: object;
};

class TrackPageViews extends React.Component<Props> {
  trackPage = (page: string) => {
    if (process.env.NODE_ENV !== 'production') {
      return;
    }

    const {options} = this.props;

    GA.set({
      page,
      ...options
    });

    GA.pageview(page);
  };

  componentDidMount() {
    this.trackPage(this.props.location.pathname);
  }

  componentDidUpdate(prevProps: Props) {
    const page = this.props.location.pathname;
    const prevPage = prevProps.location.pathname;

    if (page !== prevPage) {
      this.trackPage(page);
    }
  }

  render() {
    return this.props.children;
  }
}

export default withRouter(TrackPageViews);
