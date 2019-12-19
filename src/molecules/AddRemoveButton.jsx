import React, { useState } from 'react';
import PropTypes from 'prop-types';
import movieAPI from '../atoms/movieAPI';
import PageLoading from '../atoms/pageLoading';
import FavoritesChange from '../Redux/actions/FavoritesChange';
import store from '../Redux/store';

const AddRemoveButton = ({ id }) => {
  const [isLoading, setisLoading] = useState(false);
  const FavMovieArray = store.getState().favorites;

  let isFavMovie = false;
  for (let i = 0; i < FavMovieArray.length; i += 1) {
    if (id === FavMovieArray[i].imdbID) { isFavMovie = true; }
  }

  function onMovieAdd() {
    setisLoading(true);
    async function addMovietoArray() {
      const rawData = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=${movieAPI}`)
        .then((response) => response.json());
      const MovietoAdd = {
        Title: rawData.Title,
        Year: rawData.Year,
        imdbID: rawData.imdbID,
        Type: rawData.Type,
        Poster: rawData.Poster,
      };
      FavMovieArray.push(MovietoAdd);
      store.dispatch(FavoritesChange(FavMovieArray));
      setisLoading(false);
    }
    addMovietoArray();
  }

  function onMovieRemove() {
    for (let i = 0; i < FavMovieArray.length; i += 1) {
      if (id === FavMovieArray[i].imdbID) { FavMovieArray.splice(i, 1); }
    }
    store.dispatch(FavoritesChange(FavMovieArray));
    window.location.reload(true);
  }

  if (isLoading) { return (<PageLoading />); }

  return (!isFavMovie) ? (
    <button
      type="submit"
      value="Submit"
      className="btn btn-success m-4"
      onClick={() => onMovieAdd()}
    >
                    Add to Favorites
    </button>
  ) : (
    <button
      type="submit"
      value="Submit"
      className="btn btn-danger m-4"
      onClick={() => onMovieRemove()}
    >
                    Remove From Favorites
    </button>
  );
};

AddRemoveButton.propTypes = {
  id: PropTypes.string,
};

AddRemoveButton.defaultProps = {
  id: null,
};

export default AddRemoveButton;
