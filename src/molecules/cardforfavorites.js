import React, {useState, useEffect} from 'react';
import './card.css';
import {Link} from "react-router-dom";
import movieAPI from "../atoms/movieAPI";
import AddRemoveButton from "./AddRemoveButton";

const Cardforfavorites = ({id}) => {
    const [movietoDisplay, setmovietoDisplay] = useState(null);

    async function getmovieData () {
        const rawData = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=${movieAPI}`)
            .then(response => response.json());
        setmovietoDisplay(rawData);
    }

    //eslint-disable-next-line
    useEffect (()=> {getmovieData()},[]);

    return (!movietoDisplay) ? (
        <div className="p-padding text-center">
            <h2 className="text-warning">No Movie to Display</h2>
        </div>
    ) : (
        <div className="card d-inline-flex m-card-width m-card-hover m-2 bg-dark">
            <Link to="/details" onClick={()=>localStorage.setItem(`movieID`,`${id}`)}>
                <img className="card-img-top" alt='Error Loading' src={movietoDisplay.Poster}/>
                <div className="card-body">
                    <h2 className="card-title text-warning">{movietoDisplay.Title}</h2>
                    <p className="card-text text-white">Year: {movietoDisplay.Year}</p>
                    <p className="card-text text-white">Type: {movietoDisplay.Type}</p>
                </div>
            </Link>
            <a href={`https://www.imdb.com/title/${movietoDisplay.imdbID}/`} className="card-link hyperLink">Imdb ID: {movietoDisplay.imdbID}</a>
            <AddRemoveButton id={movietoDisplay.imdbID}/>
        </div>
    );
};

export default Cardforfavorites;