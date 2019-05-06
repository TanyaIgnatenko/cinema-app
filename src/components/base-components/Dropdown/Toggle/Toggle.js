import { useContext } from 'react';
import PropTypes from 'prop-types';

import { Dropdown } from '../index';

import '../Dropdown.scss';

function Toggle({ children }) {
  const { on, toggleDropdownList } = useContext(Dropdown.Context);
  return children(on, toggleDropdownList);
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
