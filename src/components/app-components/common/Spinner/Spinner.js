import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './Spinner.scss';

function Spinner({ message, className }) {
  return (
    <div className={classNames('spinner-container', className)}>
      <div className='spinner' />
      <p className='loading-msg'>{message}</p>
    </div>
  );
}

Spinner.propTypes = {
  message: PropTypes.string,
  className: PropTypes.string,
};

Spinner.defaultProps = {
  message: 'Идет загрузка',
  className: '',
};

export default Spinner;
