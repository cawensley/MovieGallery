import React,{useState} from 'react';
import movieAPI from "../atoms/movieAPI";
import PageLoading from "../atoms/pageLoading";
import FavoritesChange from "../Redux/actions/FavoritesChange";
import store from "../Redux/store";

const AddRemoveButton = ({id}) => {
    const [isLoading,setisLoading]=useState(false);
    let FavMovieArray = store.getState().favorites;

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
            store.dispatch(FavoritesChange(FavMovieArray));
            setisLoading(false);
        }
        addMovietoArray();
    }

    function onMovieRemove () {
        for (var i=0;i<FavMovieArray.length;i++) {
            if (id===FavMovieArray[i].imdbID) {FavMovieArray.splice(i,1)}}
        store.dispatch(FavoritesChange(FavMovieArray));
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

export default AddRemoveButton;