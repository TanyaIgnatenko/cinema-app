import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { Dropdown } from '..';

import '../Dropdown.scss';

function Toggle({
  className,
  openedClassName,
  closedClassName,
  children,
  ...props
}) {
  const { isOpen, toggleDropdownList } = useContext(Dropdown.Context);
  return React.cloneElement(children, {
    className: classNames(
      className,
      'ignore-react-onclickoutside',
      isOpen ? openedClassName : closedClassName,
    ),
    onClick: toggleDropdownList,
    ...props,
  });
}

Toggle.propTypes = {
  children: PropTypes.any.isRequired,
  className: PropTypes.string,
  openedClassName: PropTypes.string,
  closedClassName: PropTypes.string,
};

Toggle.defaultProps = {
  className: 'toggleIcon',
  openedClassName: 'up',
  closedClassName: 'down',
};

export default Toggle;
