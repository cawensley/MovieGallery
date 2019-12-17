import React from 'react';
import Card from './card';
import {connect} from "react-redux";
import PageChange from "../Redux/actions/PageChange";
import ResultsChange from "../Redux/actions/ResultsChange";
import SearchChange from "../Redux/actions/SearchChange";
import MovieChange from "../Redux/actions/MovieChange";
import FavoritesChange from "../Redux/actions/FavoritesChange";

const Cardlist = ({movies,props}) => {
    return (
        <div>
            {
                movies.map((user, i) => {
                    return (
                        <Card
                            props={props}
                            key={i}
                            Title={movies[i].Title}
                            Year={movies[i].Year}
                            id={movies[i].imdbID}
                            Type={movies[i].Type}
                            Poster={movies[i].Poster}
                        />
                    );
                })
            }
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

export default connect(mapStatetoProps,mapDispatchtoProps)(Cardlist);