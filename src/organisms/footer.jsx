import React from 'react';

const Footer = () => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();

  return (
    <div className="bg-dark fixed-bottom text-center text-white">
Copyright &copy; Movie Gallery Website
      {' '}
      {currentYear.toString()}
    </div>
  );
};

export default Footer;
