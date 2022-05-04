import { AnyAction, combineReducers } from 'redux';
import { persistReducer, PersistConfig } from 'redux-persist';
import sessionStorage from 'redux-persist/lib/storage/session';
import localStorage from 'redux-persist/lib/storage';
import { UserState } from './user/user.reducer';
import userReducer from './user/user.reducer';

export type RootState = ReturnType<typeof rootReducer>;
type UserReducer = ReturnType<typeof userReducer>;

type ExtendedPersistConfig = PersistConfig<RootState> & {
  blacklist: (keyof RootState)[];
}

type ExtendedUserPersistConfig = PersistConfig<UserState> & {
  blacklist: (keyof UserState)[];
}

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
