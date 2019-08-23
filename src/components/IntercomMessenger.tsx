import React from 'react';
import Intercom from 'react-intercom';

export class IntercomMessenger extends React.Component {
  render() {
    return (
      <div className="app">
        <Intercom appID="m2p83i8s" />
      </div>
    );
  }
}
