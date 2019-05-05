import React from 'react';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';

import { NotImplementedPage } from '../../pages/common/NotImplementedPage';
import { MoviePage } from '../../pages/movie';
import { MoviesPage } from '../../pages/movies';
import { ROUTE } from '../../constants';

function Routes(location) {
  return (
    <Switch>
      <Route location={location} exact path={ROUTE.MOVIES} component={MoviesPage} />
      <Route location={location} exact path={ROUTE.MOVIE} component={MoviePage} />
      <Route location={location} exact path={ROUTE.SOON_MOVIES} component={NotImplementedPage} />
      <Route location={location} exact path={ROUTE.BEST_DEALS} component={NotImplementedPage} />
      <Redirect to={ROUTE.MOVIES} />
    </Switch>
  );
}

Routes.propTypes = {};

export default withRouter(Routes);
