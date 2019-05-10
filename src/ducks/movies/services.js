/* eslint-disable no-use-before-define */
import { getTodayDate, getTomorrowDate } from '../../utils/date';

import { todayMovies, tomorrowMovies } from '../../mocks/movies';
import { todaySeances, tomorrowSeances } from '../../mocks/seances';

function fetchMovies(date) {
  return new Promise(resolve => {
    setTimeout(() => resolve(getMovies(date)), 1000);
  });
}

function fetchMovie(id) {
  return new Promise(resolve => {
    setTimeout(() => resolve(getMovie(id)), 1000);
  });
}

function fetchSeances(movieId, date) {
  console.log('date: ', date);
  return new Promise(resolve => {
    setTimeout(() => resolve(getSeances(movieId, date)), 1000);
  });
}

function getMovies(date) {
  const today = getTodayDate();
  const tomorrow = getTomorrowDate();

  switch (date) {
    case today:
      return todayMovies;
    case tomorrow:
      return tomorrowMovies;
    default:
      return [];
  }
}

function getMovie(id) {
  let movie = todayMovies.find(movie => movie.id === id);
  if (movie) return movie;

  movie = tomorrowMovies.find(movie => movie.id === id);
  if (movie) return movie;

  throw new NotFoundError('Movie with given id is not found');
}

class NotFoundError extends Error {
  constructor(message) {
    super();
    this.name = 'NotFoundError';
    this.message = message;
  }
}

function getSeances(movieId, date) {
  const today = getTodayDate();
  const tomorrow = getTomorrowDate();

  switch (date) {
    case today:
      return todaySeances;
    case tomorrow:
      return tomorrowSeances;
    default:
      return {};
  }
}

export { fetchMovies, fetchMovie, fetchSeances };