import { combineReducers } from 'redux';
import { createBrowserHistory } from 'history';
import { connectRouter } from 'connected-react-router';

import { movies } from '../ducks/movies/reducer';
import { date } from '../ducks/date/reducer';

const history = createBrowserHistory();

const rootReducer = combineReducers({
  router: connectRouter(history),
  movies,
  date,
});

export { history, rootReducer };
