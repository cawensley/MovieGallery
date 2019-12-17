import React from 'react';
import './card.scss';
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import MovieChange from "../Redux/actions/MovieChange";
import PageChange from "../Redux/actions/PageChange";
import ResultsChange from "../Redux/actions/ResultsChange";
import SearchChange from "../Redux/actions/SearchChange";
import FavoritesChange from "../Redux/actions/FavoritesChange";
import AddRemoveButton from "./AddRemoveButton";

const Card = ({Title,Year,id,Type,Poster,props}) => {
    var DisplayPoster = `${Poster}`;
    if(DisplayPoster==="N/A") {DisplayPoster=require(`../images/imageBlank.jpg`)}

    return (
        <div className="card d-inline-flex m-card-width m-card-hover m-1 bg-dark">
            <Link to="/details" onClick={()=>props.setMovieChange(`${id}`)}>
                <img className="m-cardimg-height w-100" alt='Error Loading' src={DisplayPoster}/>
                <div className="card-body">
                    <h5 className="card-title text-warning">{Title}</h5>
                    <p className="card-text text-light">Year: {Year}</p>
                    <p className="card-text text-light">Type: {Type}</p>
                </div>
            </Link>
            <a href={`https://www.imdb.com/title/${id}/`} rel="noopener noreferrer" target="_blank"
               className="m-cardhyperLink-color">Imdb ID: {id}</a>
            <AddRemoveButton id={id} props={props}/>
        </div>
    );
};

const mapStatetoProps = ({page,results,search,movie,favorites})=>({page,results,search,movie,favorites});
const mapDispatchtoProps = dispatch => ({
    setPageChange: page=>dispatch(PageChange(page)),
    setResultsChange: results=>dispatch(ResultsChange(results)),
    setSearchString: string=>dispatch(SearchChange(string)),
    setMovieChange: movie=>dispatch(MovieChange(movie)),
    setFavoritesArray: favoritemovies=>dispatch(FavoritesChange(favoritemovies))
});

export default connect(mapStatetoProps,mapDispatchtoProps)(Card);