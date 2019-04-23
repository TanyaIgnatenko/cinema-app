import React from 'react';
import ReactDOM from 'react-dom';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import moment from 'moment';

import { App } from './containers/app';
import { Movie } from './components/movies/Movie';
import { history } from './store/rootReducer';
import { store } from './store/store';

import './assets/scss/main.scss';
import { GENRE } from './constants';
import lordOfTheRingsPoster from './assets/images/lord-of-the-rings.jpg';
import lionKingPoster from './assets/images/lion-king.jpg';
import mulhollandDrivePoster from './assets/images/mulholland-drive.jpg';
import pullFictionPoster from './assets/images/pulp-fiction.jpg';

moment.locale('ru');

const nominative_months = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь',
];

const subjective_months = [
  'Января',
  'Февраля',
  'Мара',
  'Апреля',
  'Мая',
  'Июня',
  'Июля',
  'Августа',
  'Сентября',
  'Октября',
  'Ноября',
  'Декабря',
];

moment.updateLocale('ru', {
  months(momentToFormat, format) {
    if (/^MMMM/.test(format)) {
      return nominative_months[momentToFormat.month()];
    }
    return subjective_months[momentToFormat.month()];
  },
  weekdaysShort: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
  weekdaysMin: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
});

const currentUser = {
  name: 'Таня',
  surname: 'Игнатенко',
};

// ReactDOM.render(
//   <Provider store={store}>
//     <ConnectedRouter history={history}>
//       <App />
//     </ConnectedRouter>
//   </Provider>,
//   document.getElementById('root'),
// );

const movie = {
  name: 'Властелин колец',
  genres: [GENRE.FANTASY, GENRE.ADVENTURES],
  poster: lordOfTheRingsPoster,
  seances: {
    '2d': [
      {
        startTime: '10 30',
        price: '150',
      },
      {
        startTime: '12 40',
        price: '180',
      },
      {
        startTime: '14 00',
        price: '200',
      },
      {
        startTime: '12 40',
        price: '180',
      },
      {
        startTime: '14 00',
        price: '200',
      },
      {
        startTime: '12 40',
        price: '180',
      },
      {
        startTime: '14 00',
        price: '200',
      },
    ],
    '3d': [
      {
        startTime: '12 30',
        price: '200',
      },
      {
        startTime: '14 30',
        price: '250',
      },
      {
        startTime: '16 50',
        price: '270',
      },
      {
        startTime: '14 30',
        price: '250',
      },
      {
        startTime: '16 50',
        price: '270',
      },
      {
        startTime: '14 30',
        price: '250',
      },
      {
        startTime: '16 50',
        price: '270',
      },
    ],
  },
};

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Movie
        name={movie.name}
        genres={movie.genres}
        poster={movie.poster}
        seances={movie.seances}
      />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'),
);
