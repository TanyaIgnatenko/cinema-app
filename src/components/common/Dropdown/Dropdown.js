import React from 'react';
import PropTypes from 'prop-types';

import { Item } from './Item';
import { List } from './List';
import { Toggle as DropdownToggle } from './Toggle';
import { Toggle as ToggleLogic } from '../Toggle';

import './Dropdown.scss';

const DropdownContext = React.createContext({
  closeDropdown: () => {},
});

class Dropdown extends React.Component {
  static propTypes = {
    children: PropTypes.any.isRequired,
  };

  static Context = DropdownContext;

  static Toggle = DropdownToggle;

  static List = List;

  static Item = Item;

  render() {
    const { children } = this.props;

    return (
      <div className='dropdown'>
        <ToggleLogic>
          {(isOpen, toggle, open, close) => (
            <DropdownContext.Provider
              value={{
                isOpen,
                toggleDropdownList: toggle,
                closeDropdownList: close,
              }}
            >
              {children}
            </DropdownContext.Provider>
          )}
        </ToggleLogic>
      </div>
    );
  }
}

export default Dropdown;
