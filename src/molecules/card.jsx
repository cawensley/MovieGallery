import React from 'react';
import PropTypes from 'prop-types';
import './card.scss';
import { Link } from 'react-router-dom';
import AddRemoveButton from './AddRemoveButton';

const Card = ({
  Title, Year, imdbID, Type, Poster,
}) => {
  let DisplayPoster = `${Poster}`;
  if (DisplayPoster === 'N/A') { DisplayPoster = require('../images/imageBlank.jpg'); }

  return (
    <div className="card d-inline-flex m-card-width m-card-hover m-1 bg-dark">
      <Link to={`/details/${imdbID}`}>
        <img className="m-cardimg-height w-100" alt="Error Loading" src={DisplayPoster} />
        <div className="card-body">
          <h5 className="card-title text-warning">{Title}</h5>
          <p className="card-text text-light">
Year:
            {Year}
          </p>
          <p className="card-text text-light">
Type:
            {Type}
          </p>
        </div>
      </Link>
      <a
        href={`https://www.imdb.com/title/${imdbID}/`}
        rel="noopener noreferrer"
        target="_blank"
        className="m-cardhyperLink-color"
      >
Imdb ID:
        {' '}
        {imdbID}
      </a>
      <AddRemoveButton id={imdbID} />
    </div>
  );
};

Card.propTypes = {
  Title: PropTypes.string,
  Year: PropTypes.string,
  imdbID: PropTypes.string,
  Type: PropTypes.string,
  Poster: PropTypes.string,
};

Card.defaultProps = {
  Title: null,
  Year: null,
  imdbID: null,
  Type: null,
  Poster: null,
};

export default Card;
