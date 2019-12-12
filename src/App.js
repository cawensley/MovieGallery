import React,{useState} from 'react';
import {HashRouter as Router, Switch, Route} from "react-router-dom";
import MainNavBar from "./organisms/MainNavBar"
import Favorites from "./pages/favorites";
import Home from "./pages/home";
import Details from "./pages/details";
import Footer from "./organisms/footer";
import Particles from 'react-particles-js';
import particleOptions from "./atoms/particleOptions";
import MovieContext from "./store/store";

const App = () => {
    const UserData = useState({
        SearchString: "star",
        Favorites: [],
        MovieSelected: "tt1663662",
        PageSelected: 1,
        ResultsSelected: 10
    });

    return (
        <MovieContext.Provider value={UserData}>
            <Router>
                <Particles className='p-particles' params={particleOptions}/>
                <MainNavBar/>
                <Switch>
                    <Route path="/details" component={Details}/>
                    <Route path="/favorites" component={Favorites}/>
                    <Route path="/" component={Home}/>
                </Switch>
                <Footer/>
            </Router>
        </MovieContext.Provider>
    )
};

export default App;