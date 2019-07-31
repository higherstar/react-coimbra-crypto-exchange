import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { App } from './app/App';

const APP_ELEMENT = document.getElementById('app')!;
const render = (Component: React.ComponentClass<any>) => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    APP_ELEMENT,
  );
};

render(App);

declare var module: any;
if (module.hot) {
  module.hot.accept('./app/App', () => {
    render(require('./app/App').App);
  });
}
