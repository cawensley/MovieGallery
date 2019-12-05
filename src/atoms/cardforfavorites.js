import React,{useState} from 'react';
import './card.css';
import {Link} from "react-router-dom";
import movieAPI from "./movieAPI";

const Cardforfavorites = ({id}) => {
    const [Title,setTitle] = useState();
    const [Year,setYear] = useState();
    const [Type,setType] = useState();
    const [Poster,setPoster] = useState();

    async function getmovieData () {
        const rawData = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=${movieAPI}`)
            .then(response => response.json());
        setTitle(rawData.Title);
        setYear(rawData.Year);
        setType(rawData.Type);
        setPoster(rawData.Poster);
    }

    function onMovieRemove () {
        var FavMovieArray = JSON.parse(localStorage.getItem("favoriteArray"));
        for (var i=0;i<FavMovieArray.length;i++) {
            if (id===FavMovieArray[i]) {FavMovieArray.splice(i,1)}
        }
        localStorage.setItem("favoriteArray",JSON.stringify(FavMovieArray));
        window.location.reload(true)
    }

    getmovieData();

    return (
        <Link to="/details" onClick={()=>localStorage.setItem(`movieID`,`${id}`)}
              className='card a-card-width a-card-hover d-inline-flex m-2 text-center bg-dark text-white'>
            <img className="card-img-top" alt='Error Loading' src={`${Poster}`} height={400} />
            <div>
                <h2 className="text-warning">Title: {Title}</h2>
                <p>Year: {Year}</p>
                <p>Imdb ID: {id}</p>
                <p>Type: {Type}</p>
                <button type="submit" value="Submit" className="btn btn-primary m-4"
                        onClick={()=>onMovieRemove()}>Remove From Favorites</button>
            </div>
        </Link>
    );
};

export default Cardforfavorites;