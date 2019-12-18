import React, {useEffect} from 'react';
import PageTitle from "../atoms/pageTitle";
import Cardlist from "../molecules/cardlist";
import store from "../Redux/store";

const Favorites = () => {

    //eslint-disable-next-line
    useEffect (()=> {window.scrollTo(0,0)},[]);

    return (store.getState().favorites.length===0) ? (
        <div className="container-fluid p-padding text-center">
            <PageTitle Title={'Favorite Movies'}/>
            <h2 className="text-warning">No Favorites Stored</h2>
        </div>
    ) : (
        <div className="container-fluid p-padding text-center">
            <PageTitle Title={'Favorite Movies'}/>
            <Cardlist movies={store.getState().favorites}/>
        </div>
    );
};

export default Favorites;