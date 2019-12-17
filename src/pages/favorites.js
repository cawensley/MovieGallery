import React, {useEffect} from 'react';
import PageTitle from "../atoms/pageTitle";
import Cardlist from "../molecules/cardlist";
import {connect} from "react-redux";
import PageChange from "../Redux/actions/PageChange";
import ResultsChange from "../Redux/actions/ResultsChange";
import SearchChange from "../Redux/actions/SearchChange";
import MovieChange from "../Redux/actions/MovieChange";
import FavoritesChange from "../Redux/actions/FavoritesChange";

const Favorites = (props) => {

    //eslint-disable-next-line
    useEffect (()=> {window.scrollTo(0,0)},[]);

    return (props.favorites.length===0) ? (
        <div className="container-fluid p-padding text-center">
            <PageTitle Title={'Favorite Movies'}/>
            <h2 className="text-warning">No Favorites Stored</h2>
        </div>
    ) : (
        <div className="container-fluid p-padding text-center">
            <PageTitle Title={'Favorite Movies'}/>
            <Cardlist movies={props.favorites} props={props}/>
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

export default connect(mapStatetoProps,mapDispatchtoProps)(Favorites);