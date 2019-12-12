import React, {useEffect,useContext} from 'react';
import PageTitle from "../atoms/pageTitle";
import Cardlist from "../molecules/cardlist";
import MovieContext from "../store/MovieContext";

const Favorites = () => {
    const {UserData} = useContext(MovieContext);

    //eslint-disable-next-line
    useEffect (()=> {window.scrollTo(0,0)},[]);

    return (UserData.Favorites.length===0) ? (
        <div className="container-fluid p-padding text-center">
            <PageTitle Title={'Favorite Movies'}/>
            <h2 className="text-warning">No Favorites Stored</h2>
        </div>
    ) : (
        <div className="container-fluid p-padding text-center">
            <PageTitle Title={'Favorite Movies'}/>
            <Cardlist movies={UserData.Favorites}/>
        </div>
    );
};

export default Favorites;