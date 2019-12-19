import React from 'react';
import PropTypes from 'prop-types';

const ShowResults = ({ Results, Page, Total }) => {
  const minResults = (Page - 1) * (Results) + 1;
  let maxResults = Results * Page;

  if (Results * Page > Total) { maxResults = Total; }

  return (
    <p className="text-warning">
Displaying Results:
      {' '}
      {minResults}
      {' '}
through
      {' '}
      {maxResults}
    </p>
  );
};

ShowResults.propTypes = {
  Results: PropTypes.number,
  Page: PropTypes.number,
  Total: PropTypes.number,
};

ShowResults.defaultProps = {
  Results: null,
  Page: null,
  Total: null,
};

export default ShowResults;
