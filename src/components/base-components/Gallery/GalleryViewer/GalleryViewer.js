import React from 'react';
import PropTypes from 'prop-types';

import crossIcon from '../../../../assets/images/light-cross-icon.svg';

import './GalleryViewer.scss';

function GalleryViewer({ items, selectedItemIdx, selectItem, closeViewer }) {
  const handleNextItemClick = () =>
    selectItem((selectedItemIdx + 1) % items.length);
  const handlePreviousItemClick = () =>
    selectItem((items.length + selectedItemIdx - 1) % items.length);

  return (
    <div className='gallery-popup'>
      <div className='popup-header'>
        <p className='item-number-info'>
          {`${selectedItemIdx + 1} из ${items.length}`}
        </p>
        <img
          alt='close'
          className='close-icon smoothly-enhance-on-hover'
          src={crossIcon}
          onClick={closeViewer}
        />
      </div>
      <div className='popup-content'>
        <img
          alt='item'
          className='item-content'
          src={items[selectedItemIdx].url}
        />
        <div
          className='btn-prev smoothly-enhance-on-hover'
          onClick={handlePreviousItemClick}
        />
        <div
          className='btn-next smoothly-enhance-on-hover'
          onClick={handleNextItemClick}
        />
      </div>
      <div className='popup-footer'>
        <p className='item-description'>{items[selectedItemIdx].description}</p>
      </div>
    </div>
  );
}

GalleryViewer.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      description: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  selectedItemIdx: PropTypes.number.isRequired,
  selectItem: PropTypes.func.isRequired,
  closeViewer: PropTypes.func.isRequired,
};

export default GalleryViewer;
