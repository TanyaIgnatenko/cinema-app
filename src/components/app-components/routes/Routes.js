import React from 'react';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';

import { BestDealsPage } from '../bestDeals/BestDealsPage';
import { MoviePageContainer } from '../movies/movie-page';
import { MoviesPage } from '../movies/movies-page';
import { ROUTE } from '../../../constants';

function Routes(location) {
  return (
    <Switch>
      <Route
        location={location}
        exact
        path={ROUTE.MOVIES}
        component={MoviesPage}
      />
      <Route
        location={location}
        exact
        path={ROUTE.MOVIE}
        component={MoviePageContainer}
      />
      <Route
        location={location}
        exact
        path={ROUTE.SOON_MOVIES}
        component={BestDealsPage}
      />
      <Route
        location={location}
        exact
        path={ROUTE.BEST_DEALS}
        component={BestDealsPage}
      />
      <Redirect to={ROUTE.MOVIES} />
    </Switch>
  );
}

Routes.propTypes = {};

export default withRouter(Routes);
