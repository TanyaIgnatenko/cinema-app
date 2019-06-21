import React from 'react';

import sadnessIcon from '../../../../assets/images/sad-icon.svg';

import { StatusModal } from '../../common/StatusModal';

function ReservationFailureModal() {
  return (
    <StatusModal
      statusMsg={'К сожалению, пока вы выбирали,\n эти места уже заняли'}
      icon={sadnessIcon}
      closeButtonLabel='Ок'
    />
  );
}

export default ReservationFailureModal;
