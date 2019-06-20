import React from 'react';

import { StatusModal } from '../../common/StatusModal';

import sadnessIcon from '../../../../assets/images/sad-icon.svg';

function PaymentFailureModal() {
  return (
    <StatusModal
      statusMsg='Оплата не прошла\nПопробуйте еще раз'
      icon={sadnessIcon}
      closeButtonLabel='Ок'
    />
  );
}

export default PaymentFailureModal;
