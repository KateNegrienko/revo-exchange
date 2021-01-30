import { createBrowserHistory } from "history";
import { createStore, compose, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import combineReducers from "../reducers";
import rootSaga from "../sagas/";

export const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sagaMiddleware = createSagaMiddleware();
const storeFactory = composeEnhancers(applyMiddleware(sagaMiddleware))(
  createStore
);

export const history = createBrowserHistory();

export const store = storeFactory(combineReducers);

sagaMiddleware.run(rootSaga);
