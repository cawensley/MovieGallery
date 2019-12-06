import React from 'react';
import './card.css';
import {Link} from "react-router-dom";
import AddRemoveButton from "./AddRemoveButton";

const Cardforsearches = ({Title,Year,id,Type,Poster}) => {

    return (
        <div className="d-inline-flex card a-card-width a-card-hover d-inline-flex m-2 text-center bg-dark text-white">
            <Link to="/details" onClick={()=>localStorage.setItem(`movieID`,`${id}`)}>
                <img className="card-img-top" alt='Error Loading' src={`${Poster}`} height={400} />
                <h2 className="text-warning">{Title}</h2>
                <p className="text-light">Year: {Year}</p>
                <p className="text-light">Type: {Type}</p>
            </Link>
            <a href={`https://www.imdb.com/title/${id}/`} className="hyperLink">Imdb ID: {id}</a>
            <AddRemoveButton id={id}/>
        </div>
    );
};

export default Cardforsearches;