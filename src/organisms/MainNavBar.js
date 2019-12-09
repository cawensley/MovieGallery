import {Link} from "react-router-dom";
import React from "react";

const MainNavBar=()=> {
    return (
        <nav className="navbar navbar-expand-md bg-dark fixed-top p-1">
            <h2 className="text-light">Movie Gallery</h2>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive">
                <span className="text-white"><i className="fas fa-bars"></i></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarResponsive">
                <ul className="navbar-nav ml-auto">
                    <li className="navbar-brand">
                        <Link to="/" className="nav-link px-3 py-1">Search</Link>
                    </li>
                    <li className="navbar-brand">
                        <Link to="/favorites" className="nav-link px-3 py-1">Favorites</Link>
                    </li>
                    <li className="navbar-brand">
                        <Link to="/details" className="nav-link px-3 py-1">Details</Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
};

export default MainNavBar;