import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './NoScheduleComponent.scss';

function NoScheduleComponent({ className }) {
  return (
    <div className={classNames('no-schedule-container', className)}>
      <p className='no-schedule-msg'>Расписание на выбранную дату не найдено</p>
    </div>
  );
}

NoScheduleComponent.propTypes = {
  className: PropTypes.string,
};

NoScheduleComponent.defaultProps = {
  className: '',
};

export default NoScheduleComponent;
