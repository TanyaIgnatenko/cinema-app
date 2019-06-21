import React from 'react';

import { StatusModal } from '../../common/StatusModal';

import sadnessIcon from '../../../../assets/images/sad-icon.svg';

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
