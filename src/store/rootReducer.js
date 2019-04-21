import { combineReducers } from 'redux';

import { connectRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { date } from '../ducks/date/reducer';

const history = createBrowserHistory();

const rootReducer = combineReducers({
  router: connectRouter(history),
  date,
});

export { history, rootReducer };
