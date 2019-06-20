import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './NotFoundComponent.scss';

function NotFoundComponent({ resetSettings, className }) {
  return (
    <div className={classNames('info-box', className)}>
      <div className='info no-found'>
        По вашему запросу ничего нет
        <br />
        <span className='reset-request'>
          Пожалуйста,&nbsp;
          <button className='reset-settings-link' onClick={resetSettings}>
            сбросьте настройки
          </button>
        </span>
      </div>
    </div>
  );
}

NotFoundComponent.propTypes = {
  resetSettings: PropTypes.func.isRequired,
  className: PropTypes.string,
};

NotFoundComponent.defaultProps = {
  className: '',
};

export default NotFoundComponent;
