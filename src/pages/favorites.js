import React, {useEffect} from 'react';
import Cardforfavorites from '../molecules/cardforfavorites';
import PageTitle from "../atoms/pageTitle";

const Favorites = () => {

    if (localStorage.getItem("favoriteArray")) {
        var FavMovieArray = JSON.parse(localStorage.getItem("favoriteArray"))}

    //eslint-disable-next-line
    useEffect (()=> {window.scrollTo(0,0)},[]);

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