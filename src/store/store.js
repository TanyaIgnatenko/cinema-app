import { applyMiddleware, createStore } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

import { rootReducer, history } from './rootReducer';

const navigationMiddleware = routerMiddleware(history);
const initialState = {};

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(navigationMiddleware)),
);

export { store };
