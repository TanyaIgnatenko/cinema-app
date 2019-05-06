import React from 'react';

import './Spinner.scss';

function Spinner() {
  return (
    <div className='info-box'>
      <div className='spinner' />
      <p className='loading-msg'>Идет загрузка</p>
    </div>
  );
}

export default Spinner;
