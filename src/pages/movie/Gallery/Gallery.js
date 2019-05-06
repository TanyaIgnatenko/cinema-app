import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { GalleryViewer } from './GalleryViewer';

import './Gallery.scss';

const MAX_PREVIEWS_COUNT = 4;

function Gallery({ items }) {
  const hasAtLeastOneItem = Boolean(items.length);
  const primaryItem = items[0];

  const itemsWithPreviewsCount = Math.min(items.length - 1, MAX_PREVIEWS_COUNT);
  const hasAtLeastOneItemWithPreview = Boolean(itemsWithPreviewsCount);
  const itemsWithPreviews = items.slice(1, itemsWithPreviewsCount + 1);

  const hiddenItems = items.slice(itemsWithPreviewsCount + 1);
  const hasAtLeastOneHiddenItem = Boolean(hiddenItems.length);

  const [selectedItem, setSelectedItem] = useState(0);
  const [showItem, setShowItem] = useState(false);

  const handleItemClick = itemIdx => {
    setSelectedItem(itemIdx);
    setShowItem(true);
  };

  const closeViewer = () => {
    setShowItem(false);
  };

  return (
    hasAtLeastOneItem && (
      <div className='gallery'>
        <div className='primary-item-container'>
          <img className='primary-item' src={primaryItem.url} onClick={() => handleItemClick(0)} />
        </div>
        {hasAtLeastOneItemWithPreview && (
          <div className='items-previews-container'>
            <>
              {itemsWithPreviews.map((itemWithPreview, idx) => (
                <div
                  key={itemWithPreview.url}
                  className='item-preview-container'
                  onClick={() => handleItemClick(idx + 1)}
                >
                  <img className='item-preview' src={itemWithPreview.url} />
                </div>
              ))}
              {hasAtLeastOneHiddenItem && (
                <div
                  className='hidden-items-count'
                  onClick={() => handleItemClick(itemsWithPreviewsCount + 1)}
                >
                  {`+${hiddenItems.length}`}
                </div>
              )}
            </>
          </div>
        )}
        {showItem && (
          <GalleryViewer
            items={items}
            selectedItem={selectedItem}
            selectItem={setSelectedItem}
            closeViewer={closeViewer}
          />
        )}
      </div>
    )
  );
}

Gallery.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      description: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};

export default Gallery;
