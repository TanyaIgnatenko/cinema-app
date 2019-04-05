import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { Item } from './Item';
import { List } from './List';

import downArrowIcon from '../../../assets/images/down-arrow.svg';

import './Dropdown.scss';
import Toggle from '../Toggle/Toggle';

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

  render() {
    const {
      children,
      toggleIcon,
      openedToggleIconClassName,
      closedToggleIconClassName,
    } = this.props;

    return (
      <div className='dropdown'>
        <DropdownContext.Provider
          value={{
            closeDropdown: this.closeDropdown,
          }}
        >
          <Toggle>
            {(isOpen, toggle, open, close) => (
              <>
                <img
                  alt='toggle-icon'
                  src={toggleIcon}
                  className={classNames(
                    'ignore-react-onclickoutside',
                    isOpen
                      ? openedToggleIconClassName
                      : closedToggleIconClassName,
                  )}
                  onClick={toggle}
                />

                {isOpen && (
                  <Dropdown.List closeDropdown={close} className='dropdownList'>
                    {children}
                  </Dropdown.List>
                )}
              </>
            )}
          </Toggle>
        </DropdownContext.Provider>
      </div>
    );
  }
}

export default Dropdown;
