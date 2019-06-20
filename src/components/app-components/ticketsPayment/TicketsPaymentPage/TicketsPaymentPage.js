import React, { useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import Card from 'react-credit-cards';
import declint from 'declint-ru';
import classNames from 'classnames';

import { Button } from '../../../base-components/Button';
import { useInputState } from '../../../../hooks/useInputState';
import { useFocusState } from '../../../../hooks/useFocusState';
import { MODAL, RUSSIAN_CURRENCY_SYMBOL } from '../../../../constants';

import 'react-credit-cards/lib/styles.scss';
import './TicketsPaymentPage.scss';
import { closeModal, showModal } from '../../../../ducks/ui/modals/actions';
import { connect } from 'react-redux';

function TicketsPaymentPage({ tickets, totalPrice, showModal, closeModal }) {
  const [
    number,
    handleNumberChange,
    handleNumberBlur,
    numberValid,
    numberTouched,
  ] = useInputState({
    initialValue: '',
    shouldMatch: useMemo(() => /^[\d| ]{16,22}$/, []),
    required: true,
  });
  const [
    name,
    handleNameChange,
    handleNameBlur,
    nameValid,
    nameTouched,
  ] = useInputState({
    initialValue: '',
    shouldMatch: useMemo(() => /^[[a-zA-Z]| ]+$/, []),
    required: true,
  });
  const [
    expiry,
    handleExpiryChange,
    handleExpiryBlur,
    expiryValid,
    expiryTouched,
  ] = useInputState({
    initialValue: '',
    shouldMatch: useMemo(() => /^\d\d\/\d\d$/, []),
    required: true,
  });
  const [
    cvc,
    handleCvcChange,
    handleCvcBlur,
    cvcValid,
    cvcTouched,
  ] = useInputState({
    initialValue: '',
    shouldMatch: useMemo(() => /^\d{3,4}$/, []),
    required: true,
  });

  const allValid = useMemo(() => {
    return numberValid && nameValid && expiryValid && cvcValid;
  }, [numberValid, nameValid, expiryValid, cvcValid]);

  const [focused, handleFocusChange] = useFocusState('');

  const handleSubmit = useCallback(() => {
    closeModal();
    showModal(MODAL.PAYMENT_SUCCESS);
  }, []);

  const ticketsCount = declint(tickets.length, [
    '%s билет',
    '%s билета',
    '%s билетов',
  ]);

  return (
    <div className='tickets-payment-box'>
      <header className='tickets-payment-header'>
        <h1 className='tickets-payment-title'>Оплата билетов</h1>
      </header>
      <div className='tickets-info-box'>
        <p className='tickets-info'>
          {`= ${ticketsCount} ${totalPrice}${RUSSIAN_CURRENCY_SYMBOL}`}
        </p>
      </div>
      <div className='payment-info-box'>
        <Card
          number={number}
          name={name}
          expiry={expiry}
          cvc={cvc}
          focused={focused}
          className='card'
          placeholders={{
            name: 'IVAN IVANOV',
          }}
        />
        <div className='form'>
          <input
            type='tel'
            name='number'
            className={classNames(
              'form-input',
              numberTouched && !numberValid && 'invalid',
            )}
            placeholder='Номер карты'
            onChange={handleNumberChange}
            onFocus={handleFocusChange}
            onBlur={handleNumberBlur}
          />
          <input
            type='text'
            name='name'
            className={classNames(
              'form-input',
              nameTouched && !nameValid && 'invalid',
            )}
            placeholder='IVAN IVANOV'
            onChange={handleNameChange}
            onFocus={handleFocusChange}
            onBlur={handleNameBlur}
          />
          <input
            type='tel'
            name='expiry'
            className={classNames(
              'form-input',
              expiryTouched && !expiryValid && 'invalid',
            )}
            placeholder='Срок действия'
            onChange={handleExpiryChange}
            onFocus={handleFocusChange}
            onBlur={handleExpiryBlur}
          />
          <input
            type='tel'
            name='cvc'
            className={classNames(
              'form-input',
              cvcTouched && !cvcValid && 'invalid',
            )}
            placeholder='CVC'
            onChange={handleCvcChange}
            onFocus={handleFocusChange}
            onBlur={handleCvcBlur}
          />
        </div>
      </div>
      <div className='payment-actions'>
        <Button
          className={classNames('pay-btn', !allValid && 'disabled')}
          onClick={handleSubmit}
          disabled={!allValid}
        >
          Оплатить
        </Button>
      </div>
    </div>
  );
}

const mapDispatchToProps = {
  showModal,
  closeModal,
};

TicketsPaymentPage.propTypes = {
  tickets: PropTypes.arrayOf(PropTypes.Object).isRequired,
  totalPrice: PropTypes.number.isRequired,
  showModal: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default connect(
  null,
  mapDispatchToProps,
)(TicketsPaymentPage);
