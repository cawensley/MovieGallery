import React, {useState, useEffect} from 'react';
import './card.css';
import {Link} from "react-router-dom";
import movieAPI from "../atoms/movieAPI";

const Cardforfavorites = ({id}) => {
    const [movietoDisplay, setmovietoDisplay] = useState(null);

    async function getmovieData () {
        const rawData = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=${movieAPI}`)
            .then(response => response.json());
        setmovietoDisplay(rawData);
    }

    function onMovieRemove () {
        var FavMovieArray = JSON.parse(localStorage.getItem("favoriteArray"));
        for (var i=0;i<FavMovieArray.length;i++) {
            if (id===FavMovieArray[i]) {FavMovieArray.splice(i,1)}
        }
        localStorage.setItem("favoriteArray",JSON.stringify(FavMovieArray));
        window.location.reload(true)
    }

    //eslint-disable-next-line
    useEffect (()=> {getmovieData()},[]);

    return (!movietoDisplay) ? (
        <div className="p-padding text-center">
            <h2 className="text-warning">No Movie to Display</h2>
        </div>
    ) : (
        <Link to="/details" onClick={()=>localStorage.setItem(`movieID`,`${id}`)}
              className='card a-card-width a-card-hover d-inline-flex m-2 text-center bg-dark text-white'>
            <img className="card-img-top" alt='Error Loading' src={movietoDisplay.Poster} height={400} />
            <div>
                <h2 className="text-warning">Title: {movietoDisplay.Title}</h2>
                <p>Year: {movietoDisplay.Year}</p>
                <p>Imdb ID: {movietoDisplay.imdbID}</p>
                <p>Type: {movietoDisplay.Type}</p>
                <button type="submit" value="Submit" className="btn btn-primary m-4"
                        onClick={()=>onMovieRemove()}>Remove From Favorites</button>
            </div>
        </Link>
    );
};

export default Cardforfavorites;