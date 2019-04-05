import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { Item } from './Item';
import { List } from './List';

import downArrowIcon from '../../../assets/images/down-arrow.svg';

import './Dropdown.scss';

const DropdownContext = React.createContext({
  closeDropdown: () => {},
});

class Dropdown extends React.Component {
  static defaultProps = {
    toggleIcon: downArrowIcon,
    openedToggleIconClassName: 'up',
    closedToggleIconClassName: 'down',
  };

  static propTypes = {
    children: PropTypes.any.isRequired,
    toggleIcon: PropTypes.string,
    closedToggleIconClassName: PropTypes.string,
    openedToggleIconClassName: PropTypes.string,
  };

  static Context = DropdownContext;

  static List = List;

  static Item = Item;

  state = {
    isOpen: false,
  };

  toggleDropdown = () => {
    this.setState(state => ({ isOpen: !state.isOpen }));
  };

  closeDropdown = () => {
    this.setState({ isOpen: false });
  };

  render() {
    const {
      children,
      toggleIcon,
      openedToggleIconClassName,
      closedToggleIconClassName,
    } = this.props;

    const { isOpen } = this.state;

    return (
      <DropdownContext.Provider
        value={{
          closeDropdown: this.closeDropdown,
        }}
      >
        <div className='dropdown'>
          <img
            alt='toggle-icon'
            src={toggleIcon}
            className={classNames(
              'ignore-react-onclickoutside',
              isOpen ? openedToggleIconClassName : closedToggleIconClassName,
            )}
            onClick={this.toggleDropdown}
          />

          {isOpen && (
            <Dropdown.List
              closeDropdown={this.closeDropdown}
              className='dropdownList'
            >
              {children}
            </Dropdown.List>
          )}
        </div>
      </DropdownContext.Provider>
    );
  }
}

export default Dropdown;
