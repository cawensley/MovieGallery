import React from 'react';
import './card.css';
import {Link} from "react-router-dom";
import AddRemoveButton from "./AddRemoveButton";

const Cardforsearches = ({Title,Year,id,Type,Poster}) => {

    return (
        <div className="d-inline-flex card a-card-width a-card-hover d-inline-flex m-2 text-center bg-dark text-white">
            <Link to="/details" onClick={()=>localStorage.setItem(`movieID`,`${id}`)}>
                <img className="card-img-top" alt='Error Loading' src={`${Poster}`} height={400} />
                <h2>{Title}</h2>
                <p>Year: {Year}</p>
                <p>Imdb ID: {id}</p>
                <p>Type: {Type}</p>
            </Link>
            <AddRemoveButton id={id}/>
        </div>
    );
};

export default Cardforsearches;