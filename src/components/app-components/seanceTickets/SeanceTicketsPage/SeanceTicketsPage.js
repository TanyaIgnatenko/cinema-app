import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment/moment';
import { uniqueId } from 'lodash';
import classNames from 'classnames';

import {
  getTodayDate,
  getTomorrowDate,
  toAppDateFormat,
} from '../../../../utils/date';

import { Spinner } from '../../common/Spinner';
import { Button } from '../../../base-components/Button';
import { Tooltip } from '../../../base-components/Tooltip';
import { MODAL, RUSSIAN_CURRENCY_SYMBOL, STATUS } from '../../../../constants';
import { selectReservationStatus } from '../../../../ducks/data/tickets/selectors';
import { reserveTicketsRequest } from '../../../../ducks/data/tickets/actions';
import { closeModal, showModal } from '../../../../ducks/ui/modals/actions';

import hallScreen from '../../../../assets/images/cropped-screen.svg';

import './SeanceTicketsPage.scss';

function SeanceTicketsPage({
  id: seanceId,
  movieName,
  startTime,
  hallScheme,
  takenSeats,
  reservedSeats,
  reserveTickets,
  reservationStatus,
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
    const seatsId = selectedSeats.map(seat => seat.id);
    reserveTickets(seanceId, seatsId);
  }, [selectedSeats]);

  const goToTicketsPayment = useCallback(() => {
    closeModal();

    const seatsId = selectedSeats.map(seat => seat.id);
    const modalProps = { orderDetails: { seanceId, seatsId, totalPrice } };

    showModal(MODAL.TICKETS_PAYMENT, modalProps);
  }, [selectedSeats, totalPrice]);

  const showReservationFailureModal = useCallback(() => {
    setSelectedSeats([]);
    showModal(MODAL.RESERVATION_FAILURE);
  }, []);

  useEffect(() => {
    switch (reservationStatus) {
      case STATUS.SUCCESS: {
        goToTicketsPayment();
        break;
      }
      case STATUS.ERROR: {
        showReservationFailureModal();
        break;
      }
      case STATUS.REQUEST: {
        break;
      }
      case STATUS.IDLE: {
        break;
      }
      default: {
        console.error('Unknown status ', reservationStatus);
      }
    }
  }, [reservationStatus]);

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

  return reservationStatus === STATUS.REQUEST ||
    reservationStatus === STATUS.SUCCESS ? (
      <Spinner message='Заказ резервируется' />
  ) : (
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
        <object tabIndex={-1} data={hallScreen} style={{ width: '450px', height: '150px' }}>
          <p>Screen</p>
        </object>
        {hallScheme.map(row => {
          if (!row)
            return <div key={uniqueId('empty-row')} className='empty-row' />;

          return (
            <div key={row.number} className='row'>
              {row.seats.map((seat, idx) => {
                if (!seat) return <div key={idx} className='empty-space' />;

                const isAvailable =
                  !takenSeats.includes(seat.id) &&
                  !reservedSeats.includes(seat.id);
                const isSelected = selectedSeats.find(
                  selectedSeat => selectedSeat.id === seat.id,
                );

                return isAvailable ? (
                  <div key={idx} className='seat-box'>
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
                          {`${row.number} ряд, ${seat.number} место`}
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
  id: PropTypes.string.isRequired,
  movieName: PropTypes.string.isRequired,
  startTime: PropTypes.number.isRequired,
  hallScheme: PropTypes.arrayOf(
    PropTypes.shape({
      number: PropTypes.number.isRequired,
      seats: PropTypes.arrayOf(
        PropTypes.shape({
          number: PropTypes.number,
          price: PropTypes.number,
        }),
      ),
    }),
  ).isRequired,
  takenSeats: PropTypes.arrayOf(PropTypes.number).isRequired,
  reservedSeats: PropTypes.arrayOf(PropTypes.number).isRequired,
};

const mapStateToProps = state => ({
  reservationStatus: selectReservationStatus(state),
});

const mapDispatchToProps = {
  closeModal,
  showModal,
  reserveTickets: reserveTicketsRequest,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SeanceTicketsPage);
