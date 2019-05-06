import React from 'react';
import PropTypes from 'prop-types';

import './Search.scss';

import crossIcon from '../../../../../assets/images/cross-icon.svg';
import searchIcon from '../../../../../assets/images/search-icon.svg';

function Search({ hint, placeholder, onHintChange, resetHint, className }) {
  return (
    <div className={className}>
      <div className='input-box'>
        <img alt='' src={searchIcon} className='search-icon' />
        <input
          value={hint}
          placeholder={placeholder}
          className='search-input'
          onChange={onHintChange}
        />
        {hint && (
          <img
            alt='reset-icon'
            src={crossIcon}
            className='reset-icon'
            onClick={resetHint}
          />
        )}
      </div>
    </div>
  );
}

Search.propTypes = {
  hint: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  onHintChange: PropTypes.func.isRequired,
  resetHint: PropTypes.func.isRequired,
  className: PropTypes.string,
};

Search.defaultProps = {
  className: '',
};

export default Search;
