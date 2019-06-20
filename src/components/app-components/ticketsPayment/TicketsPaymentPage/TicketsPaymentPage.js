import React, { useRef, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import Card from 'react-credit-cards';
import declint from 'declint-ru';
import classNames from 'classnames';

import { useInputState } from '../../../../hooks/useInputState';
import { useFocusState } from '../../../../hooks/useFocusState';

import 'react-credit-cards/lib/styles.scss';
import './TicketsPaymentPage.scss';
import Button from '../../../base-components/Button/Button';
import { RUSSIAN_CURRENCY_SYMBOL } from '../../../../constants';

// state = {
//   number: '',
//   name: '',
//   expiry: '',
//   cvc: '',
//   issuer: '',
//   focused: '',
//   formData: null,
// };
//
// static propTypes = {
//   acceptedCards: PropTypes.array,
//   callback: PropTypes.func,
//   cvc: PropTypes.oneOfType([
//     PropTypes.string,
//     PropTypes.number,
//   ]).isRequired,
//   expiry: PropTypes.oneOfType([
//     PropTypes.string,
//     PropTypes.number,
//   ]).isRequired,
//   focused: PropTypes.string,
//   issuer: PropTypes.string,
//   locale: PropTypes.shape({
//     valid: PropTypes.string,
//   }),
//   name: PropTypes.string.isRequired,
//   number: PropTypes.oneOfType([
//     PropTypes.string,
//     PropTypes.number,
//   ]).isRequired,
//   placeholders: PropTypes.shape({
//     name: PropTypes.string,
//   }),
//   preview: PropTypes.bool,
// };
//
// static defaultProps = {
//   acceptedCards: [],
//   locale: {
//     valid: 'valid thru',
//   },
//   placeholders: {
//     name: 'YOUR NAME HERE',
//   },
//   preview: false,
// };

function TicketsPaymentPage({ tickets, totalPrice }) {
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

  const handleSubmit = useCallback(() => {}, []);

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
          disabled={!allValid}
        >
          Оплатить
        </Button>
      </div>
    </div>
  );
}

TicketsPaymentPage.propTypes = {
  tickets: PropTypes.arrayOf(PropTypes.Object).isRequired,
  totalPrice: PropTypes.number.isRequired,
};

export default TicketsPaymentPage;
