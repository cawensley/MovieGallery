import React from 'react';
import './card.scss';
import {Link} from "react-router-dom";
import MovieChange from "../Redux/actions/MovieChange";
import AddRemoveButton from "./AddRemoveButton";
import store from "../Redux/store";

const Card = ({Title,Year,id,Type,Poster}) => {
    var DisplayPoster = `${Poster}`;
    if(DisplayPoster==="N/A") {DisplayPoster=require(`../images/imageBlank.jpg`)}

    return (
        <div className="card d-inline-flex m-card-width m-card-hover m-1 bg-dark">
            <Link to="/details" onClick={()=>store.dispatch(MovieChange(`${id}`))}>
                <img className="m-cardimg-height w-100" alt='Error Loading' src={DisplayPoster}/>
                <div className="card-body">
                    <h5 className="card-title text-warning">{Title}</h5>
                    <p className="card-text text-light">Year: {Year}</p>
                    <p className="card-text text-light">Type: {Type}</p>
                </div>
            </Link>
            <a href={`https://www.imdb.com/title/${id}/`} rel="noopener noreferrer" target="_blank"
               className="m-cardhyperLink-color">Imdb ID: {id}</a>
            <AddRemoveButton id={id}/>
        </div>
    );
};

export default Card;