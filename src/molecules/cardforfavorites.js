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
        <div className="d-inline-flex card a-card-width a-card-hover m-2 text-center bg-dark text-white">
            <Link to="/details" onClick={()=>localStorage.setItem(`movieID`,`${id}`)}>
                <img className="card-img-top" alt='Error Loading' src={movietoDisplay.Poster}/>
                <h2 className="text-warning">{movietoDisplay.Title}</h2>
                <p className="text-light">Year: {movietoDisplay.Year}</p>
                <p className="text-light">Type: {movietoDisplay.Type}</p>
            </Link>
            <a href={`https://www.imdb.com/title/${movietoDisplay.imdbID}/`} className="hyperLink">Imdb ID: {movietoDisplay.imdbID}</a>
            <AddRemoveButton id={movietoDisplay.imdbID}/>
        </div>
    );
};

export default Cardforfavorites;