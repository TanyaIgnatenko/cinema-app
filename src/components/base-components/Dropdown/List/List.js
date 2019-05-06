import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import onClickOutside from 'react-onclickoutside';

import { Dropdown } from '../index';

import '../Dropdown.scss';

function DropdownList({ children, className, ...props }) {
  const { closeDropdownList } = useContext(Dropdown.Context);

  DropdownList.handleClickOutside = () => {
    closeDropdownList();
  };

  return (
    <ul className={className} {...props}>
      {children}
    </ul>
  );
}

const clickOutsideConfig = {
  handleClickOutside: () => DropdownList.handleClickOutside,
};

DropdownList.propTypes = {
  children: PropTypes.any.isRequired,
  className: PropTypes.string,
};

DropdownList.defaultProps = {
  className: 'dropdownList',
};

const DropdownListWithClickOutsideWatcher = onClickOutside(
  DropdownList,
  clickOutsideConfig,
);

function List({ children, className, ...props }) {
  const { on } = useContext(Dropdown.Context);
  return on ? (
    <DropdownListWithClickOutsideWatcher className={className} {...props}>
      {children}
    </DropdownListWithClickOutsideWatcher>
  ) : null;
}

List.propTypes = {
  children: PropTypes.any.isRequired,
  className: PropTypes.string,
};

List.defaultProps = {
  className: 'dropdownList',
};

export default List;
