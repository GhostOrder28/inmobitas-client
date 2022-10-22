import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/redux-store';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter } from "react-router-dom";
import * as serviceWorker from './serviceWorkerRegistration';
import App from './containers/app';
import 'tachyons';
import './index.css';

//if (process.env.NODE_ENV === 'production') {
  //console.log = function () {};
//}

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

serviceWorker.register();
//serviceWorker.unregister();
