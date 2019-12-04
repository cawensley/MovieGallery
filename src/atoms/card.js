import React from 'react';
import './card.css';

const Card = ({Title,Year,id,Type,Poster}) => {
    return (
        <div className='card m-card-width d-inline-flex m-1 text-center bg-primary'>
            <img className="card-img-top" alt='Error Loading' src={`${Poster}`} height={400} />
            <div>
                <h2>{Title}</h2>
                <p className="text-white">Year: {Year}</p>
                <p className="text-white">Imdb ID = {id}</p>
                <p className="text-white">Type: {Type}</p>
            </div>
        </div>
    );
}

export default Card;