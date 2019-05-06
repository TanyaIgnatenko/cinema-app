import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './Spinner.scss';

function Spinner({ className }) {
  return (
    <div className={classNames('spinner-container', className)}>
      <div className='spinner' />
      <p className='loading-msg'>Идет загрузка</p>
    </div>
  );
}

Spinner.propTypes = {
  className: PropTypes.string,
};

Spinner.defaultProps = {
  className: '',
};

export default Spinner;
