import React from 'react';

import { StatusModal } from '../../common/StatusModal';

import congratIcon from '../../../../assets/images/congrat-icon.svg';

function PaymentSuccessModal() {
  return (
    <StatusModal
      statusMsg='Оплата прошла успешно!'
      icon={congratIcon}
      closeButtonLabel='Ок'
    />
  );
}

export default PaymentSuccessModal;
