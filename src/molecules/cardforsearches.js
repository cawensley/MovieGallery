import React from 'react';
import './card.css';
import {Link} from "react-router-dom";

const Cardforsearches = ({Title,Year,id,Type,Poster}) => {

    return (
        <Link to="/details" onClick={()=>localStorage.setItem(`movieID`,`${id}`)}
              className='card a-card-width a-card-hover d-inline-flex m-2 text-center bg-dark text-white'>
            <img className="card-img-top" alt='Error Loading' src={`${Poster}`} height={400} />
            <div>
                <h2>{Title}</h2>
                <p>Year: {Year}</p>
                <p>Imdb ID: {id}</p>
                <p>Type: {Type}</p>
            </div>
        </Link>
    );
};

export default Cardforsearches;