import { getMovie, getMovies, getSeances } from '../../../mocks/movies';

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
  return new Promise(resolve => {
    setTimeout(() => resolve(getSeances(movieId, date)), 1000);
  });
}

export { fetchMovies, fetchMovie, fetchSeances };