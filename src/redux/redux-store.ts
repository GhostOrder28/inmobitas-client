import { createStore, applyMiddleware, Middleware, compose } from "redux";
import { persistStore } from "redux-persist";
import logger from "redux-logger";
import rootReducer from "./root-reducer";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./root-saga";

const sagaMiddleware = createSagaMiddleware();

const middlewares: Middleware[] = [sagaMiddleware];

if (process.env.NODE_ENV === "development") {
  middlewares.push(logger);
}

// @ts-ignore
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;;

const store = createStore(rootReducer, composeEnhancer(applyMiddleware(...middlewares)));
// @ts-ignore
window.store = store
sagaMiddleware.run(rootSaga)
const persistor = persistStore(store);
export { store, persistor };
