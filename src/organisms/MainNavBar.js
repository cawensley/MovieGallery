import {Link} from "react-router-dom";
import React from "react";

const MainNavBar=()=> {
    return (
            <nav className="bg-dark navbar navbar-expand o-mainnavbar_padding fixed-top p-1">
                <h2 className="">(Insert Icon Here)</h2>
                <div className="ml-auto">
                    <Link to="/" className="navbar-brand px-3 py-1">Home</Link>
                    <Link to="/favorites" className="navbar-brand px-3 py-1">Favorites</Link>
                </div>
            </nav>
    )
};

export default MainNavBar;