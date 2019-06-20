import React, { useState, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment/moment';
import classNames from 'classnames';

import {
  getTodayDate,
  getTomorrowDate,
  toAppDateFormat,
} from '../../../../utils/date';

import Button from '../../../base-components/Button/Button';

import hallScreen from '../../../../assets/images/cropped-screen.svg';

import './SeanceTicketsPage.scss';
import { MODAL, RUSSIAN_CURRENCY_SYMBOL } from '../../../../constants';
import { Tooltip } from '../../../base-components/Tooltip';
import { closeModal, showModal } from '../../../../ducks/ui/modals/actions';
import { connect } from 'react-redux';

function SeanceTicketsPage({
  movieName,
  startTime,
  hallScheme,
  takenSeats,
  reservedSeats,
  closeModal,
  showModal,
}) {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const selectSeat = useCallback((seatId, price) => {
    const seatToSelect = {
      id: seatId,
      price,
    };
    setSelectedSeats(selectedSeats => selectedSeats.concat(seatToSelect));
  }, []);

  const unselectSeat = useCallback(seatId => {
    setSelectedSeats(selectedSeats => {
      const idxToRemoveAt = selectedSeats.findIndex(seat => seat.id === seatId);

      if (idxToRemoveAt === -1) {
        console.error(`Try to unselect not selected seat with id ${seatId} `);
        return selectedSeats;
      }

      const newSelectedSeats = [...selectedSeats];
      newSelectedSeats.splice(idxToRemoveAt, 1);

      return newSelectedSeats;
    });
  }, []);

  const seatsAreNotSelected = !selectedSeats.length;

  const totalPrice = useMemo(() => {
    return selectedSeats.reduce(
      (totalPrice, seat) => (totalPrice += seat.price),
      0,
    );
  }, [selectedSeats]);

  const buyTickets = useCallback(() => {
    closeModal();

    const modalProps = { tickets: selectedSeats, totalPrice };
    showModal(MODAL.TICKETS_PAYMENT, modalProps);
  }, [selectedSeats, totalPrice]);

  const today = getTodayDate();
  const tomorrow = getTomorrowDate();
  const seanceMoment = moment.unix(startTime);
  const seanceDate = toAppDateFormat(seanceMoment);

  let seanceDateAppearance = '';
  switch (seanceDate) {
    case today:
      seanceDateAppearance = 'Сегодня';
      break;
    case tomorrow:
      seanceDateAppearance = 'Завтра';
      break;
    default:
      seanceDateAppearance = seanceMoment.format('DD MMMM');
      break;
  }
  const seanceStartTimeAppearance = moment.unix(startTime).format('HH:mm');

  return (
    <div className='seance-tickets-page-container'>
      <div className='movie-title-box'>
        <h1 className='movie-title'>{movieName}</h1>
      </div>
      <div className='seance-start-time-box'>
        <p className='seance-start-time'>
          {`${seanceDateAppearance} в ${seanceStartTimeAppearance}`}
        </p>
      </div>
      <div className='hall-scheme-box'>
        <object data={hallScreen} style={{ width: '450px' }} />
        {hallScheme.map((row, rowIdx) => {
          if (!row) return <div className='empty-row' />;

          return (
            <div className='row'>
              {row.map((seat, idx) => {
                if (!seat) return <div key={idx} className='empty-space' />;

                const isAvailable =
                  !takenSeats.includes(seat.id) &&
                  !reservedSeats.includes(seat.id);
                const isSelected = selectedSeats.find(
                  selectedSeat => selectedSeat.id === seat.id,
                );

                return isAvailable ? (
                  <div key={seat.id} className='seat-box'>
                    <div
                      className={
                        isSelected ? 'selected-seat' : 'available-seat'
                      }
                      onClick={
                        !isSelected
                          ? () => selectSeat(seat.id, seat.price)
                          : () => unselectSeat(seat.id)
                      }
                    >
                      {seat.number}
                      <Tooltip className='seat-tooltip'>
                        <p className='seat-price'>
                          {`${seat.price} ${RUSSIAN_CURRENCY_SYMBOL}`}
                        </p>
                        <p className='seat-position'>
                          {`${rowIdx + 1} ряд, ${seat.number} место`}
                        </p>
                      </Tooltip>
                    </div>
                  </div>
                ) : (
                  <div key={seat.id} className='seat-box'>
                    <div className='not-available-seat' />
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
      <div className='tickets-purchase-box'>
        {!seatsAreNotSelected && (
          <p className='total-price'>{`${totalPrice} ${RUSSIAN_CURRENCY_SYMBOL}`}</p>
        )}
        <Button
          className={classNames('buy-btn', seatsAreNotSelected && 'disabled')}
          onClick={buyTickets}
          disabled={seatsAreNotSelected}
        >
          Купить
        </Button>
      </div>
    </div>
  );
}

SeanceTicketsPage.propTypes = {
  movieName: PropTypes.string.isRequired,
  startTime: PropTypes.string.isRequired,
  hallScheme: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        number: PropTypes.number,
        price: PropTypes.number,
      }),
    ),
  ).isRequired,
  takenSeats: PropTypes.arrayOf(PropTypes.number).isRequired,
  reservedSeats: PropTypes.arrayOf(PropTypes.number).isRequired,
};

const mapDispatchToProps = {
  closeModal,
  showModal,
};

export default connect(
  null,
  mapDispatchToProps,
)(SeanceTicketsPage);
