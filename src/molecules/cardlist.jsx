import React from 'react';
import PropTypes from 'prop-types';
import Card from './card';

const Cardlist = ({ movies }) => (
  <div>
    {
        movies.map((user, i) => (
          <Card
            key={movies[i].imdbID}
            Title={movies[i].Title}
            Year={movies[i].Year}
            imdbID={movies[i].imdbID}
            Type={movies[i].Type}
            Poster={movies[i].Poster}
          />
        ))
      }
  </div>
);

Cardlist.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.shape({
    Title: PropTypes.string,
    Year: PropTypes.string,
    imdbID: PropTypes.string,
    Type: PropTypes.string,
    Poster: PropTypes.string,
  })),
};

Cardlist.defaultProps = {
  movies: null,
};

export default Cardlist;
