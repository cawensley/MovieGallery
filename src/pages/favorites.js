import React from 'react';
import Cardforfavorites from '../atoms/cardforfavorites';
import PageTitle from "../atoms/pageTitle";

function Favorites() {

    if (localStorage.getItem("favoriteArray")) {
        var FavMovieArray = JSON.parse(localStorage.getItem("favoriteArray"))}

    return (!FavMovieArray) ? (
        <div className="p-padding text-center">
            <PageTitle Title={'Your Favorite Movies!'}/>
            <h2 className="text-warning">No Favorites Stored</h2>
        </div>
    ) : (
        <div className="container-fluid p-padding text-center text-light">
            <PageTitle Title={'Your Favorite Movies!'}/>

            <div>{FavMovieArray.map((user, i) => {
                return (
                    <Cardforfavorites key={i} id={FavMovieArray[i]}/>
                )})}
            </div>
        </div>
    );
}

export default Favorites;