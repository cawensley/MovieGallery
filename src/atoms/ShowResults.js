import React from 'react';

const ShowResults = ({ResultsSelected,PageSelected,TotalResults}) => {

    let minResults=(PageSelected-1)*(ResultsSelected)+1;
    let maxResults = ResultsSelected*PageSelected;

    if (ResultsSelected*PageSelected>TotalResults)
        {maxResults=TotalResults}

    return <p className="text-warning">Displaying Results: {minResults} through {maxResults}</p>
};

export default ShowResults;