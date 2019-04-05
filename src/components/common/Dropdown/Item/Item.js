import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { Dropdown } from '..';

import '../Dropdown.scss';

function Item({ onClick, className, children, ...props }) {
  const { closeDropdown } = useContext(Dropdown.Context);
  const handleClick = event => {
    onClick();
    closeDropdown();
    event.stopPropagation();
  };

  return (
    <li onClick={handleClick} className={className} {...props}>
      {children}
    </li>
  );
}

Item.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.any.isRequired,
  className: PropTypes.string,
};

Item.defaultProps = {
  className: 'item',
};

export default Item;
