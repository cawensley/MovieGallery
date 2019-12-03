import {Link} from "react-router-dom";
import React from "react";

const MainNavBar=()=> {
    return (
        <div className="container-fluid">
            <nav className="bg-secondary navbar navbar-expand fixed-top">
                <div className="ml-auto">
                    <Link to="/" className="text-light navbar-brand px-3 py-1">Home</Link>
                    <Link to="/favorites" className="text-light navbar-brand px-3 py-1">Favorites</Link>
                </div>
            </nav>
        </div>
    )
};

export default MainNavBar;