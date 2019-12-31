import { Link } from 'react-router-dom';
import React, { useRef } from 'react';
import './MainNavBar.scss';
import store from '../Redux/store';
import PageChange from '../Redux/actions/PageChange';
import SearchChange from '../Redux/actions/SearchChange';

const MainNavBar = () => {
  const userInput = useRef(null);

  function newSearch() {
    store.dispatch(PageChange(1));
    store.dispatch(SearchChange(userInput.current));
    window.location.href = '/';
  }

  return (
    <nav className="navbar navbar-expand-sm bg-dark fixed-top p-1">
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive">
        <span className="text-white"><i className="fas fa-bars" /></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarResponsive">
        <ul className="navbar-nav">
          <li className="navbar-brand">
            <Link to="/" className="nav-link px-3 py-1">Movie Gallery</Link>
          </li>
          <li className="navbar-brand">
            <Link to="/favorites" className="nav-link px-3 py-1">Favorites</Link>
          </li>
        </ul>
      </div>
      <input
        type="text"
        placeholder="Enter a movie title"
        className="font-weight-bold"
        size="17"
        onChange={(event) => {
          userInput.current = event.target.value;
        }}
        onKeyPress={(event) => {
          if (event.key === 'Enter') { newSearch(); }
        }}
      />
      <button
        type="submit"
        value="Submit"
        className="btn btn-primary btn-sm ml-2"
        onClick={() => newSearch()}
      >
            Title Search
      </button>
    </nav>
  );
};

export default MainNavBar;
