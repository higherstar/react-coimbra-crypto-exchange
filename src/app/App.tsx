import { Classes } from '@blueprintjs/core';
import classNames from 'classnames';
import React from 'react';

import {
  Mosaic,
  MosaicNode,
  MosaicWindow,
  MosaicZeroState,
} from '../components';

import {
  ChartView,
  MarketNewsView,
  OrderBookView,
  OrderHistoryView,
  PairView
} from "./views";

import { CloseAdditionalControlsButton } from './CloseAdditionalControlsButton';

import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import '../../styles/index.less';
import './app.less';

// tslint:disable no-console

// tslint:disable-next-line no-var-requires
const gitHubLogo = require('./GitHub-Mark-Light-32px.png');
// tslint:disable-next-line no-var-requires
const { version } = require('../../package.json');

let windowCount = 3;

export const THEMES = {
  ['Blueprint']: 'mosaic-blueprint-theme',
  ['Blueprint Dark']: classNames('mosaic-blueprint-theme', Classes.DARK),
  ['None']: '',
};

export type Theme = keyof typeof THEMES;

const additionalControls = React.Children.toArray([<CloseAdditionalControlsButton />]);

const EMPTY_ARRAY: any[] = [];

export interface AppState {
  currentNode: MosaicNode<number> | null;
  currentTheme: Theme;
}

export class App extends React.PureComponent<{}, AppState> {
  state: AppState = {
    currentNode: {
      direction: 'row',
      first: {
        direction: 'column',
        first: 1,
        second: 2,
        splitPercentage: 70,
      },
      second: {
        direction: 'row',
        first: {
          direction: 'column',
          first: 3,
          second: 4,
          splitPercentage: 70,
        },
        second: 5,
        splitPercentage: 75,
      },
      splitPercentage: 20,
    },
    currentTheme: 'Blueprint Dark',
  };

  render() {
    return (
      <React.StrictMode>
        <div className="react-mosaic-example-app">
          {this.renderNavBar()}
          <Mosaic<number>
            renderTile={(count, path) => (
              <MosaicWindow<number>
                additionalControls={count === 3 ? additionalControls : EMPTY_ARRAY}
                title={`Window ${count}`}
                createNode={this.createNode}
                path={path}
                onDragStart={() => console.log('MosaicWindow.onDragStart')}
                onDragEnd={(type) => console.log('MosaicWindow.onDragEnd', type)}
                renderToolbar={() => this.renderWindowToolBar(count)}
              >
                {
                  count === 1 ? <PairView/> : count === 2 ? <MarketNewsView /> : count === 3 ? <ChartView /> : count === 4 ? <OrderHistoryView /> : <OrderBookView />
                }
              </MosaicWindow>
            )}
            zeroStateView={<MosaicZeroState createNode={this.createNode} />}
            value={this.state.currentNode}
            onChange={this.onChange}
            onRelease={this.onRelease}
            className={THEMES[this.state.currentTheme]}
          />
        </div>
      </React.StrictMode>
    );
  }

  private renderWindowToolBar = (count: number): any => {
    let res = null;
      switch (count) {
        case 1:
          res = <div className="window-toolbar">Custom Toolbar</div>;
          break;
        case 2:
          res = <div className="window-toolbar">Custom Toolbar</div>;
          break;
        case 3:
          res = <div className="window-toolbar">Custom Toolbar</div>;
          break;
        case 4:
          res = <div className="window-toolbar">Custom Toolbar</div>;
          break;
        default:
          break;
      }

      return res;
  };

  private onChange = (currentNode: MosaicNode<number> | null) => {
    this.setState({ currentNode });
  };

  private onRelease = (currentNode: MosaicNode<number> | null) => {
    console.log('Mosaic.onRelease():', currentNode);
  };

  private createNode = () => ++windowCount;

  private renderNavBar() {
    return (
      <div className={classNames(Classes.NAVBAR, Classes.DARK)}>
        <div className={Classes.NAVBAR_GROUP}>
          <div className={Classes.NAVBAR_HEADING}>
            <a href="https://github.com/higherstar/react-coimbra-crypto-exchange">
              react-coimbra-crypto-exchange <span className="version">v{version}</span>
            </a>
          </div>
        </div>
        <div className={classNames(Classes.NAVBAR_GROUP, Classes.BUTTON_GROUP)}>
          <a className="github-link" href="https://github.com/higherstar/react-coimbra-crypto-exchange">
            <img src={gitHubLogo} />
          </a>
        </div>
      </div>
    );
  }
}
