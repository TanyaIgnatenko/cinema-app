import React from 'react';
import PropTypes from 'prop-types';
import onClickOutside from 'react-onclickoutside';

import { Dropdown } from '..';

import '../Dropdown.scss';

class List extends React.Component {
  handleClickOutside = () => {
    const { closeDropdown } = this.props;
    closeDropdown();
  };

  render() {
    const { children, className, ...props } = this.props;
    return (
      <ul className={className} {...props}>
        {children}
      </ul>
    );
  }
}

List.propTypes = {
  children: PropTypes.any.isRequired,
  closeDropdown: PropTypes.func.isRequired,
  className: PropTypes.string,
};

List.defaultProps = {
  className: 'dropdownList',
};

export default onClickOutside(List);
