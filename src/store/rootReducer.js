import { combineReducers } from 'redux';
import { createBrowserHistory } from 'history';
import { connectRouter } from 'connected-react-router';

import { movies } from '../ducks/data/movies/reducer';
import { tickets } from '../ducks/data/tickets/reducer';
import { modals } from '../ducks/ui/modals/reducer';

const history = createBrowserHistory();

const rootReducer = combineReducers({
  router: connectRouter(history),
  movies,
  modals,
  tickets,
});

export { history, rootReducer };
