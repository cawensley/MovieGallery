import React,{useState} from 'react';
import movieAPI from "../atoms/movieAPI";
import PageLoading from "../atoms/pageLoading";
import {connect} from "react-redux";
import FavoritesChange from "../Redux/actions/FavoritesChange";
import PageChange from "../Redux/actions/PageChange";
import ResultsChange from "../Redux/actions/ResultsChange";
import SearchChange from "../Redux/actions/SearchChange";
import MovieChange from "../Redux/actions/MovieChange";

const AddRemoveButton = ({id , props}) => {
    const [isLoading,setisLoading]=useState(false);
    let FavMovieArray = props.favorites;

    var isFavMovie = false;
    for (var i=0;i<FavMovieArray.length;i++) {
        if (id===FavMovieArray[i].imdbID) {isFavMovie=true;}
    }

    function onMovieAdd () {
        setisLoading(true);
        async function addMovietoArray () {
            const rawData = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=${movieAPI}`)
                .then(response => response.json());
            let MovietoAdd={
                Title: rawData.Title,
                Year: rawData.Year,
                imdbID: rawData.imdbID,
                Type: rawData.Type,
                Poster: rawData.Poster
            };
            FavMovieArray.push(MovietoAdd);
            props.setFavoritesArray(FavMovieArray);
            setisLoading(false);
        }
        addMovietoArray();
    }

    function onMovieRemove () {
        for (var i=0;i<FavMovieArray.length;i++) {
            if (id===FavMovieArray[i].imdbID) {FavMovieArray.splice(i,1)}}
        props.setFavoritesArray(FavMovieArray);
        window.location.reload(true);
    }

    if (isLoading) {return(<PageLoading/>)}

    return (!isFavMovie) ? (
            <button type="submit" value="Submit" className="btn btn-success m-4"
                    onClick={()=>onMovieAdd()}>
                    Add to Favorites
            </button>
        ) : (
            <button type="submit" value="Submit" className="btn btn-danger m-4"
                    onClick={()=>onMovieRemove()}>
                    Remove From Favorites
            </button>
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

export default connect(mapStatetoProps,mapDispatchtoProps)(AddRemoveButton);