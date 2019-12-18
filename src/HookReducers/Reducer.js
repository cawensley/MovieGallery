import React,{useReducer} from 'react';
import MovieContext from "./MovieContext";

const initialState = {
    SearchString: (localStorage.getItem("Searchstring") || ""),
    Favorites: (JSON.parse(localStorage.getItem("FavoriteArray")) || []),
    MovieSelected: (localStorage.getItem("Movieselected") || null),
    PageSelected: (localStorage.getItem("Pageselected") || 1),
    ResultsSelected: (localStorage.getItem("Resultsselected") || 10)
};

const MovieState = ({children}) => {
    const [UserData,setUserData] = useReducer((UserData,action) => {
        switch(action.type) {
            case 'SearchChange':
                localStorage.setItem("Searchstring",action.payload);
                return Object.assign({},UserData,{SearchString: action.payload});
            case 'FavoritesChange':
                localStorage.setItem("FavoriteArray",JSON.stringify(action.payload));
                return Object.assign({},UserData,{Favorites: action.payload});
            case 'MovieChange':
                localStorage.setItem("Movieselected",action.payload);
                return Object.assign({},UserData,{MovieSelected: action.payload});
            case 'PageChange':
                localStorage.setItem("Pageselected",action.payload);
                return Object.assign({},UserData,{PageSelected: action.payload});
            case 'ResultsChange':
                localStorage.setItem("Resultsselected",action.payload);
                return Object.assign({},UserData,{ResultsSelected: action.payload});
            default:
                return UserData;
        }
    },initialState);

    return <MovieContext.Provider value={{UserData,setUserData}}>{children}</MovieContext.Provider>
};

export default MovieState;