import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { Item } from './Item';
import { List } from './List';
import { Toggle } from '../Toggle';

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

  render() {
    const {
      children,
      toggleIcon,
      openedToggleIconClassName,
      closedToggleIconClassName,
    } = this.props;

    return (
      <div className='dropdown'>
        <Toggle>
          {(isOpen, toggle, open, close) => (
            <DropdownContext.Provider
              value={{
                closeDropdown: close,
              }}
            >
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
            </DropdownContext.Provider>
          )}
        </Toggle>
      </div>
    );
  }
}

export default Dropdown;
