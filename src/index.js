import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/redux-store';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter, unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import * as serviceWorker from './serviceWorkerRegistration';
import App from './containers/app';
import 'tachyons';
import './index.css';
import { createBrowserHistory } from 'history';

if (process.env.NODE_ENV === 'production') {
  console.log = function () {};
}

export const history = createBrowserHistory();

ReactDOM.render(
  <Provider store={store}>
    <HistoryRouter history={history}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </HistoryRouter>
  </Provider>,
  document.getElementById('root')
);

serviceWorker.register();
//serviceWorker.unregister();
