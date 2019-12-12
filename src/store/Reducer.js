import React,{useReducer} from 'react';
import MovieContext from "./MovieContext";

const initialState = {
    SearchString: "",
    Favorites: [],
    MovieSelected: null,
    PageSelected: 1,
    ResultsSelected: 10
};

const MovieState = ({children}) => {
    const [UserData,setUserData] = useReducer((state,action) => {
        switch(action.type) {
            case 'SearchChange':
                return Object.assign({},state,{SearchString: action.payload});
            case 'FavoritesChange':
                return Object.assign({},state,{Favorites: action.payload});
            case 'MovieChange':
                return Object.assign({},state,{MovieSelected: action.payload});
            case 'PageChange':
                return Object.assign({},state,{PageSelected: action.payload});
            case 'ResultsChange':
                return Object.assign({},state,{ResultsSelected: action.payload});
            default:
                return state;
        }
    },initialState);

    return <MovieContext.Provider value={{UserData,setUserData}}>{children}</MovieContext.Provider>
};

export default MovieState;