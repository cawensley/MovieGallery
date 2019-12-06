import React from 'react';

const AddRemoveButton = ({ id }) => {

    var isFavMovie = false;
    if (localStorage.getItem("favoriteArray")) {
        var FavMovieArray = JSON.parse(localStorage.getItem("favoriteArray"))};
    for (var i=0;i<FavMovieArray.length;i++) {
        if (id===FavMovieArray[i]) {isFavMovie=true;}
    }

    function onMovieAdd () {
        var MovieArray = [];
        if (localStorage.getItem("favoriteArray")) {
            MovieArray = JSON.parse(localStorage.getItem("favoriteArray"))}
        MovieArray.push(id);
        localStorage.setItem("favoriteArray",JSON.stringify(MovieArray));
        window.location.reload(true)
    }

    function onMovieRemove () {
        var FavMovieArray = JSON.parse(localStorage.getItem("favoriteArray"));
        for (var i=0;i<FavMovieArray.length;i++) {
            if (id===FavMovieArray[i]) {FavMovieArray.splice(i,1)}
        }
        localStorage.setItem("favoriteArray",JSON.stringify(FavMovieArray));
        window.location.reload(true)
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






