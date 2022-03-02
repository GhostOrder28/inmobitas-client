import { combineReducers } from 'redux';
// import { persistReducer } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session';

import userReducer from './user/user.reducer';
import testingReducer from './testing/testing.reducer';

// const persistConfig = {
//   key: 'root',
//   storage: storageSession,
// };

const rootReducer = combineReducers({
  user: userReducer,
  test: testingReducer
});

// export default persistReducer(persistConfig, rootReducer);
export default rootReducer;
