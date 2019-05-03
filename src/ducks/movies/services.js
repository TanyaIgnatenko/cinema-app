/* eslint-disable no-use-before-define */
import { GENRE } from '../../constants';
import lordOfTheRingsPoster from '../../assets/images/lord-of-the-rings.jpg';

function fetchMovies() {
  return mockMovies;
}

export { fetchMovies };

const mockMovies = [
  {
    id: 0,
    name: 'Властелин колец',
    genres: [GENRE.FANTASY, GENRE.ADVENTURES],
    poster: lordOfTheRingsPoster,
    seances: {
      '3D': [
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
          startTime: '17 50',
          price: '250',
        },
        {
          startTime: '19 20',
          price: '270',
        },
      ],
      '2D': [
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
          startTime: '15 20',
          price: '180',
        },
        {
          startTime: '16 50',
          price: '200',
        },
        {
          startTime: '18 30',
          price: '180',
        },
        {
          startTime: '20 10',
          price: '200',
        },
      ],
    },
  },
  {
    id: 1,
    name: 'Властелин колец',
    genres: [GENRE.FANTASY, GENRE.ADVENTURES],
    poster: lordOfTheRingsPoster,
    seances: {
      '3D': [
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
          startTime: '17 20',
          price: '250',
        },
        {
          startTime: '19 50',
          price: '270',
        },
      ],
      '2D': [
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
          startTime: '15 20',
          price: '180',
        },
        {
          startTime: '16 50',
          price: '200',
        },
        {
          startTime: '18 30',
          price: '180',
        },
        {
          startTime: '20 10',
          price: '200',
        },
      ],
    },
  },
  {
    id: 2,
    name: 'Властелин колец',
    genres: [GENRE.FANTASY, GENRE.ADVENTURES],
    poster: lordOfTheRingsPoster,
    seances: {
      '3D': [
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
          startTime: '17 20',
          price: '250',
        },
        {
          startTime: '19 50',
          price: '270',
        },
      ],
      '2D': [
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
          startTime: '15 20',
          price: '180',
        },
        {
          startTime: '16 50',
          price: '200',
        },
        {
          startTime: '18 30',
          price: '180',
        },
        {
          startTime: '20 10',
          price: '200',
        },
      ],
    },
  },
  {
    id: 3,
    name: 'Властелин колец',
    genres: [GENRE.FANTASY, GENRE.ADVENTURES],
    poster: lordOfTheRingsPoster,
    seances: {
      '3D': [
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
          startTime: '17 20',
          price: '250',
        },
        {
          startTime: '19 50',
          price: '270',
        },
      ],
      '2D': [
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
          startTime: '15 20',
          price: '180',
        },
        {
          startTime: '16 50',
          price: '200',
        },
        {
          startTime: '18 30',
          price: '180',
        },
        {
          startTime: '20 10',
          price: '200',
        },
      ],
    },
  },
];
