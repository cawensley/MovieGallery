import { Link } from 'react-router-dom';
import React from 'react';
import './MainNavBar.scss';

const MainNavBar = () => (
  <nav className="navbar navbar-expand-sm bg-dark fixed-top p-1">
    <Link to="/" className="nav-link h3 px-3 py-1">Movie Gallery</Link>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive">
      <span className="text-white"><i className="fas fa-bars" /></span>
    </button>

    <div className="collapse navbar-collapse" id="navbarResponsive">
      <ul className="navbar-nav ml-auto">
        <li className="navbar-brand">
          <Link to="/favorites" className="nav-link px-3 py-1">Favorites</Link>
        </li>
      </ul>
    </div>
  </nav>
);

export default MainNavBar;
