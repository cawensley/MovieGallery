import React, {Component} from 'react';
import {HashRouter as Router, Switch, Route} from "react-router-dom";
import MainNavBar from "./organisms/MainNavBar"


class App extends Component {

    render() {
        return (
            <Router>
                <MainNavBar/>
                <Switch>

                </Switch>
            </Router>
        )
    }
}

export default App;