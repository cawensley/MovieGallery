import React from 'react';
import './card.css';

const Card = ({ name, email, id }) => {
    return (
        <div className='card m-card-width d-inline-flex m-1 text-center bg-primary'>
            <img alt='Error Loading' src={`https://robohash.org/${id}?size=200x200`} />
            <div>
                <h2>{name}</h2>
                <p>{email}</p>
            </div>
        </div>
    );
}

export default Card;