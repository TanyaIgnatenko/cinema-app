import React from 'react';

import './BestDealsPage.scss';

import sadnessIcon from '../../../../assets/images/sad-icon.svg';

function BestDealsPage() {
  return (
    <p className='page-info'>
      К сожалению, в данный момент акции не проходят{' '}
      <img className='sadness-icon' src={sadnessIcon} />
    </p>
  );
}

export default BestDealsPage;
