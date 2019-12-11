import React, {useEffect} from 'react';
import PageTitle from "../atoms/pageTitle";
import Cardlist from "../molecules/cardlist";

const Favorites = () => {

    if (localStorage.getItem("favoriteArray")) {
        var FavMovieArray = JSON.parse(localStorage.getItem("favoriteArray"))}

    //eslint-disable-next-line
    useEffect (()=> {window.scrollTo(0,0)},[]);

    return (!FavMovieArray) ? (
        <div className="container-fluid p-padding text-center">
            <PageTitle Title={'Favorite Movies'}/>
            <h2 className="text-warning">No Favorites Stored</h2>
        </div>
    ) : (
        <div className="container-fluid p-padding text-center">
            <PageTitle Title={'Favorite Movies'}/>
            <Cardlist movies={FavMovieArray}/>
        </div>
    );
};

export default Favorites;