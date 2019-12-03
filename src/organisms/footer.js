import React from 'react';

const Footer=()=> {
    let currentDate = new Date();
    let currentYear = currentDate.getFullYear();

    return (
        <div className="text-white text-center bg-dark py-1">
            <small>Copyright &copy; Movie Gallery Website {currentYear.toString()}</small>
        </div>
    )
};

export default Footer;