import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import UiStore from './store/uiStore';
import DomainStore from './store/domainStore';
import Router from './routes';
import * as serviceWorker from './serviceWorker';
import './index.css';

const store = { ...new DomainStore(), uiStore: new UiStore() };

ReactDOM.render(
  <Provider {...store}>
    <Router />
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
