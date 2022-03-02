import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
// import { store, persistor } from './redux/redux-store';
import store from './redux/redux-store';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter } from "react-router-dom";
import App from './containers/app';
import 'tachyons';
import './index.css';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      {/* <PersistGate loading={null} persistor={persistor}> */}
      <App />
      {/* </PersistGate> */}
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
