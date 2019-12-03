import React from 'react';
import {HashRouter as Router, Switch, Route} from "react-router-dom";
import MainNavBar from "./organisms/MainNavBar"
import Favorites from "./pages/favorites";
import Home from "./pages/home";
import Footer from "./organisms/footer";


function App () {
        return (
            <Router>
                <MainNavBar/>
                <Switch>
                    <Route path="/favorites" component={Favorites}/>
                    <Route path="/" component={Home}/>
                </Switch>
                <Footer/>
            </Router>
        )
}

export default App;