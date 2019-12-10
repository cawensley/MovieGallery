import React from 'react';
import movieAPI from "../atoms/movieAPI";

const AddRemoveButton = ({ id }) => {

    var isFavMovie = false;
    if (localStorage.getItem("favoriteArray")) {
        var FavMovieArray = JSON.parse(localStorage.getItem("favoriteArray"))}

    if (FavMovieArray) {
    for (var i=0;i<FavMovieArray.length;i++) {
        if (id===FavMovieArray[i].imdbID) {isFavMovie=true;}
    }}

    function onMovieAdd () {
        var MovieArray = [];
        if (localStorage.getItem("favoriteArray")) {
            MovieArray = JSON.parse(localStorage.getItem("favoriteArray"))}
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
            MovieArray.push(MovietoAdd);
            localStorage.setItem("favoriteArray",JSON.stringify(MovieArray));
            window.location.reload(true);
        }
        addMovietoArray();
    }

    function onMovieRemove () {
        var MovieArray = JSON.parse(localStorage.getItem("favoriteArray"));
        for (var i=0;i<MovieArray.length;i++) {
            if (id===MovieArray[i].imdbID) {MovieArray.splice(i,1)}}
        localStorage.setItem("favoriteArray",JSON.stringify(MovieArray));
        window.location.reload(true);
    }

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






