import React from 'react';

import './UserIcon.scss';

import userIcon from '../../../../assets/images/user-icon.svg';

function UserIcon() {
  return (
    <div className='circle'>
      <img alt='user-icon' src={userIcon} />
    </div>
  );
}

UserIcon.propTypes = {};

export default UserIcon;
