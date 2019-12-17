import React from 'react';
import {HashRouter as Router, Switch, Route} from "react-router-dom";
import MainNavBar from "./organisms/MainNavBar"
import Favorites from "./pages/favorites";
import Home from "./pages/home";
import Details from "./pages/details";
import Footer from "./organisms/footer";
import Particles from 'react-particles-js';
import particleOptions from "./atoms/particleOptions";
import store from "./Redux/store";
import {Provider} from 'react-redux';

const App = () => {

    return (
        <Provider store={store}>
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
        </Provider>
    )
};

export default App;