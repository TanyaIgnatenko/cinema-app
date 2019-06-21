import React from 'react';

import sadnessIcon from '../../../../assets/images/sad-icon.svg';

import './BestDealsPage.scss';

function BestDealsPage() {
  return (
    <p className='page-info'>
      К сожалению, в данный момент акции не проходят{' '}
      <img alt='' className='sadness-icon' src={sadnessIcon} />
    </p>
  );
}

export default BestDealsPage;
