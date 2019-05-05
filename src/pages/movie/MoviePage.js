import React from 'react';
import PropTypes from 'prop-types';

function MoviePage({name, desciption, genres, duration, frames, seances}) {

  return (
    <>
      <h1 className='page-title'>{name}</h1>


    </>
  );
}

MoviePage.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  duration: PropTypes.number.isRequired,
  frames: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  seances: PropTypes.objectOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        startTime: PropTypes.number.isRequired,
        price: PropTypes.string.isRequired,
      }),
    ),
  ).isRequired,
};

export default MoviePage;
