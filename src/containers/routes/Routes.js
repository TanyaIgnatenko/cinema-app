import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';

import { NotImplementedPage } from '../../components/common/NotImplementedPage';
import { MoviesPageContainer } from '../movies';
import { ROUTE } from '../../constants';

function Routes(location) {
  return (
    <Switch>
      <Route
        location={location}
        exact
        path={ROUTE.MOVIES}
        component={MoviesPageContainer}
      />
      <Route
        location={location}
        exact
        path={ROUTE.SOON_MOVIES}
        component={NotImplementedPage}
      />
      <Route
        location={location}
        exact
        path={ROUTE.BEST_DEALS}
        component={NotImplementedPage}
      />
      <Redirect to={ROUTE.MOVIES} />
    </Switch>
  );
}

Routes.propTypes = {};

export default withRouter(Routes);
