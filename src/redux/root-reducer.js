import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import sessionStorage from 'redux-persist/lib/storage/session';
import localStorage from 'redux-persist/lib/storage';

import userReducer from './user/user.reducer';

const persistConfig = {
  key: 'root',
  storage: localStorage,
  blacklist: ['user']
};

const persistConfigErrors = {
  key: 'user',
  storage: localStorage,
  blacklist: ['errors']
};

const rootReducer = combineReducers({
  user: persistReducer(persistConfigErrors, userReducer),
});

export default persistReducer(persistConfig, rootReducer);
