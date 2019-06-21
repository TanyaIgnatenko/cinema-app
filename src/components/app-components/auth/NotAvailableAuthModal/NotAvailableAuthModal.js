import React from 'react';

import sadnessIcon from '../../../../assets/images/sad-icon.svg';

import { StatusModal } from '../../common/StatusModal';

function NotAvailableAuthModal() {
  return (
    <StatusModal
      statusMsg={
        'К сожалению, в вашем регионе\nне доступна функция авторизации'
      }
      icon={sadnessIcon}
      closeButtonLabel='Ок'
    />
  );
}

export default NotAvailableAuthModal;
