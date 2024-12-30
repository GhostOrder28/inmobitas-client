import { createStore, applyMiddleware, Middleware, compose } from "redux";
import { persistStore } from "redux-persist";
import logger from "redux-logger";
import rootReducer from "./root-reducer";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./root-saga";
import { composeWithDevTools } from '@redux-devtools/extension';
import * as appActionCreators from "./app/app.actions"
import * as userActionCreators from "./user/user.actions"

const sagaMiddleware = createSagaMiddleware();

const middlewares: Middleware[] = [sagaMiddleware];

if (process.env.NODE_ENV === "development") {
  middlewares.push(logger);
}

const store = createStore(rootReducer, compose(applyMiddleware(...middlewares)));

// const composeEnhancers = composeWithDevTools({
//   actionCreators: appActionCreators
// });
// const store = createStore(rootReducer, composeEnhancers(
//   applyMiddleware(...middlewares)
// ));

// @ts-ignore
window.store = store
sagaMiddleware.run(rootSaga)
const persistor = persistStore(store);
export { store, persistor };
