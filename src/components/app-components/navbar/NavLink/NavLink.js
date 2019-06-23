import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link, withRouter } from 'react-router-dom';

import './NavLink.scss';

function NavLink({
  to,
  location,
  children,
  linkClassName,
  activeLinkClassName,
  linkBoxClassName,
  activeLinkBoxClassName,
  ...props
}) {
  const isActive = to === location.pathname;
  return (
    <li
      data-testid='link-box'
      className={classNames('link-box', linkBoxClassName, {
        'active-link-box': isActive,
        activeLinkBoxClassName: isActive,
      })}
    >
      <Link
        to={to}
        data-testid='link'
        className={classNames('link', linkClassName, {
          'active-link': isActive,
          activeLinkClassName: isActive,
        })}
      >
        {children}
      </Link>
    </li>
  );
}

NavLink.propTypes = {
  to: PropTypes.string.isRequired,
  location: PropTypes.object.isRequired,
  children: PropTypes.any.isRequired,
  linkClassName: PropTypes.string,
  linkBoxClassName: PropTypes.string,
  activeLinkClassName: PropTypes.string,
  activeLinkBoxClassName: PropTypes.string,
};

NavLink.defaultProps = {
  linkClassName: '',
  linkBoxClassName: '',
  activeLinkClassName: '',
  activeLinkBoxClassName: '',
};

export default withRouter(NavLink);
