import React from 'react';
import PropTypes from 'prop-types';

import './NotFoundComponent.scss';

function NotFoundComponent({ resetSettings }) {
  return (
    <div className='info-box'>
      <div className='info no-found'>
        По вашему запросу ничего нет
        <br />
        <span className='reset-request'>
          Пожалуйста,&nbsp;
          <a className='reset-settings-link' onClick={resetSettings}>
            сбросьте настройки
          </a>
        </span>
      </div>
    </div>
  );
}

NotFoundComponent.propTypes = {
  resetSettings: PropTypes.func.isRequired,
};

export default NotFoundComponent;
