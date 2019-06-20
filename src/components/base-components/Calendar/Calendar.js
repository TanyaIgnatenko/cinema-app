import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import onClickOutside from 'react-onclickoutside';

import Moment from 'moment/moment';
import { extendMoment } from 'moment-range/dist/moment-range';

import { ButtonNext } from '../ButtonNext';
import { ButtonPrev } from '../ButtonPrev';
import { range } from '../../../utils/array';

import { dateRange, toAppDateFormat, toMoment } from '../../../utils/date';

import './Calendar.scss';

const moment = extendMoment(Moment);

class Calendar extends React.Component {
  static propTypes = {
    initialMonth: PropTypes.string,
    onDateSelected: PropTypes.func.isRequired,
    closeCalendar: PropTypes.func,
    onDateEnter: PropTypes.func,
    onDateLeave: PropTypes.func,
    minDate: PropTypes.string,
    maxDate: PropTypes.string,
    closeOnSelect: PropTypes.bool,
  };

  static defaultProps = {
    initialMonth: toAppDateFormat(moment()),
    onDateEnter: () => {},
    onDateLeave: () => {},
    closeCalendar: () => {},
    closeOnSelect: false,
    minDate: null,
    maxDate: null,
  };

  state = {
    selectedMonth: this.props.initialMonth,
  };

  handleNextMonthClick = () => {
    this.setState(({ selectedMonth }) => {
      const monthMoment = toMoment(selectedMonth);
      const nextMonthMoment = monthMoment.add(1, 'months');
      const nextMonth = toAppDateFormat(nextMonthMoment);
      return { selectedMonth: nextMonth };
    });
  };

  handlePrevMonthClick = () => {
    this.setState(({ selectedMonth }) => {
      const monthMoment = toMoment(selectedMonth);
      const prevMonthMoment = monthMoment.subtract(1, 'months');
      const prevMonth = toAppDateFormat(prevMonthMoment);
      return { selectedMonth: prevMonth };
    });
  };

  handleDateSelected = date => {
    const {
      onDateSelected,
      onDateLeave,
      closeOnSelect,
      closeCalendar,
    } = this.props;

    onDateSelected(date);
    if (closeOnSelect) {
      onDateLeave(date);
      closeCalendar();
    }
  };

  handleClickOutside = () => {
    const { closeCalendar } = this.props;
    closeCalendar();
  };

  render() {
    const { minDate, maxDate, onDateEnter, onDateLeave } = this.props;

    const { selectedMonth } = this.state;
    const selectedMonthMoment = toMoment(selectedMonth);

    const startMonthDate = selectedMonthMoment.startOf('month').clone();
    const endMonthDate = selectedMonthMoment.endOf('month').clone();
    const monthDates = dateRange(startMonthDate, endMonthDate);

    const startWeekdayNumber = Number(startMonthDate.format('E'));
    const startEmptyDays = range(1, startWeekdayNumber);

    const minMoment = toMoment(minDate);
    const maxMoment = toMoment(maxDate);
    const prevMonthBtnEnabled =
      !minMoment.isValid() || minMoment.isBefore(startMonthDate);
    const nextMonthBtnEnabled =
      !minMoment.isValid() || maxMoment.isAfter(endMonthDate);

    return (
      <div className='calendar'>
        <div className='selectMonthArea'>
          <p className='month'>{selectedMonthMoment.format('MMMM')}</p>
          <div className='btnContainer'>
            <ButtonPrev
              onClick={this.handlePrevMonthClick}
              className={classNames(
                'btn btn-prev',
                !prevMonthBtnEnabled && 'disabled',
              )}
              disabled={!prevMonthBtnEnabled}
            />
            <ButtonNext
              onClick={this.handleNextMonthClick}
              className={classNames('btn', !nextMonthBtnEnabled && 'disabled')}
              disabled={!nextMonthBtnEnabled}
            />
          </div>
        </div>
        <ul className='weekdays'>
          <li key={0} className='weekday'>
            пн
          </li>
          <li key={1} className='weekday'>
            вт
          </li>
          <li key={2} className='weekday'>
            ср
          </li>
          <li key={3} className='weekday'>
            чт
          </li>
          <li key={4} className='weekday'>
            пт
          </li>
          <li key={5} className='weekday weekend'>
            сб
          </li>
          <li key={6} className='weekday weekend'>
            вс
          </li>
        </ul>
        <ul className='days'>
          {startEmptyDays.map(day => (
            <li key={day} className='day' />
          ))}
          {monthDates.map(date => {
            const enabledDate =
              !minMoment.isValid() ||
              (date.isSameOrAfter(minMoment) && date.isSameOrBefore(maxDate));
            return (
              <li
                key={date.format('DD')}
                onClick={() =>
                  enabledDate
                    ? this.handleDateSelected(toAppDateFormat(date))
                    : false
                }
                className={enabledDate ? 'enabled-day' : 'disabled-day'}
                onMouseEnter={() =>
                  enabledDate ? onDateEnter(toAppDateFormat(date)) : false
                }
                onMouseLeave={() =>
                  enabledDate ? onDateLeave(toAppDateFormat(date)) : false
                }
              >
                {date.format('DD')}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default onClickOutside(Calendar);
