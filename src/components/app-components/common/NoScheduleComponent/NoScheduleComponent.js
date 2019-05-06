import React from 'react';

import './NoScheduleComponent.scss';

function NoScheduleComponent() {
  return (
    <div className='seances-info-box'>
      <p className='seances-info no-schedule'>Расписание на выбранную дату не найдено</p>
    </div>
  );
}

export default NoScheduleComponent;
