import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import classNames from 'classnames';

import hallScreen from '../../../../../assets/images/hall-screen.svg';
import { getTodayDate, getTomorrowDate, toAppDateFormat } from '../../../../../utils/date';
import Button from '../../../../base-components/Button/Button';

function SeanceTicketsPage({ movieName, startTime, hallScheme, takenSeats, reservedSeats }) {
  const selectSeat = ({ target: { id: seatId } }) => {
    selectedSeats.push(seatId);
  };

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
      <h1 className='movie-title'>{movieName}</h1>
      <div className='seance-start-time-container'>
        <p className='seance-start-time'>
          `${seanceDateAppearance} в ${seanceStartTimeAppearance}`
        </p>
      </div>
      <div className='hall-scheme-container'>
        <object ref={frame} data={hallScreen} style={{ width: '100%', height: '100%' }} />
        {hallScheme.map((row, idx) => (
          <div className='hall-row' id={idx}>
            {row.map(seat => {
              const isAvailable = takenSeats.includes(seat) && reservedSeats.includes(seat);
              const isSelected = selectedSeats.includes(seat);
              return seat ? (
                <>
                  <div
                    className={classNames('seat', {
                      'selected': isSelected,
                      'not-available': !isAvailable,
                    })}
                  />
                  {isAvailable && <div className='seat-tooltip' />}
                </>
              ) : (
                <div className='empty-space' />
              );
            })}
          </div>
        ))}
      </div>
      <div className='tickets-purchase-container'>
        {selectedSeats && <p>{totalSum}</p>}
        <Button>Купить</Button>
      </div>
    </div>
  );
}

SeanceTicketsPage.propTypes = {
  movieName: PropTypes.string.isRequired,
  startTime: PropTypes.string.isRequried,
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

export default SeanceTicketsPage;
