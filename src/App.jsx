import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import Particles from 'react-particles-js';
import MainNavBar from './organisms/MainNavBar';
import Favorites from './pages/favorites';
import Home from './pages/home';
import Details from './pages/details';
import Footer from './organisms/footer';
import particleOptions from './atoms/particleOptions';

const App = () => (
  <Router>
    <Particles className="p-particles" params={particleOptions} />
    <MainNavBar />
    <Switch>
      <Route path="/details/:imdbID" component={Details} />
      <Route path="/favorites" component={Favorites} />
      <Route path="/" component={Home} />
    </Switch>
    <Footer />
  </Router>
);

export default App;
