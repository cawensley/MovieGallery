import React from 'react';
import Cardforfavorites from '../atoms/cardforfavorites';
import PageTitle from "../atoms/pageTitle";

function Favorites() {

    var FavMovieArray = JSON.parse(localStorage.getItem("favoriteArray"));

    return (
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