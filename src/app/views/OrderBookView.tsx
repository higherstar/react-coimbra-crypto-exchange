// import { Classes } from '@blueprintjs/core';
// import classNames from 'classnames';
import React from 'react';

export interface OrderBookViewState {

}

export class OrderBookView extends React.PureComponent<{}, OrderBookViewState> {
  state: OrderBookViewState = {

  };

  render() {
    return <div className="example-window">
      <h1>OrderBook View</h1>
    </div>;
  }
}
