import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Moment from 'moment';
import { extendMoment } from 'moment-range';
import onClickOutside from 'react-onclickoutside';

import { ButtonNext } from '../ButtonNext';
import { ButtonPrev } from '../ButtonPrev';
import { range } from '../../../helpers/arrayHelpers';

import {
  dateRange,
  toAppDateFormat,
  toMoment,
} from '../../../helpers/dateHelpers';

import './Calendar.scss';

const moment = extendMoment(Moment);

class Calendar extends React.Component {
  static propTypes = {
    onDateSelected: PropTypes.func.isRequired,
    closeCalendar: PropTypes.func,
    onDateEnter: PropTypes.func,
    onDateLeave: PropTypes.func,
    minDate: PropTypes.string,
    maxDate: PropTypes.string,
    closeOnSelect: PropTypes.bool,
  };

  static defaultProps = {
    onDateEnter: () => {},
    onDateLeave: () => {},
    closeCalendar: () => {},
    closeOnSelect: false,
    minDate: null,
    maxDate: null,
  };

  state = {
    selectedMonth: toAppDateFormat(moment()),
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
    const { onDateSelected, closeOnSelect, closeCalendar } = this.props;
    onDateSelected(date);
    if (closeOnSelect) closeCalendar();
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
    const startEmptyDays = range(1, startWeekdayNumber - 1);

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
          <li className='weekday'>пн</li>
          <li className='weekday'>вт</li>
          <li className='weekday'>ср</li>
          <li className='weekday'>чт</li>
          <li className='weekday'>пт</li>
          <li className='weekday weekend'>сб</li>
          <li className='weekday weekend'>вс</li>
        </ul>
        <ul className='days'>
          {startEmptyDays.map(() => (
            <li className='day' />
          ))}
          {monthDates.map(date => {
            const enabledDate =
              !minMoment.isValid() ||
              (date.isSameOrAfter(minMoment) && date.isSameOrBefore(maxDate));
            return (
              <li
                onClick={() =>
                  enabledDate ? this.handleDateSelected(date) : false
                }
                className={enabledDate ? 'enabled-day' : 'disabled-day'}
                onMouseEnter={() => (enabledDate ? onDateEnter(date) : false)}
                onMouseLeave={() => (enabledDate ? onDateLeave(date) : false)}
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
