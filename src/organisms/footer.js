import React from 'react';
import './footer.css';

const Footer=()=> {
    let currentDate = new Date();
    let currentYear = currentDate.getFullYear();

    return (
        <div className="text-white text-center bg-dark py-2 o-footer-height o-footer-bottom">
            <small>Copyright &copy; Movie Gallery Website {currentYear.toString()}</small>
        </div>
    )
};

export default Footer;