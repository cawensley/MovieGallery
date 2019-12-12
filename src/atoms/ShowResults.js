import React from 'react';

const ShowResults = ({Results,Page,Total}) => {

    let minResults=(Page-1)*(Results)+1;
    let maxResults = Results*Page;

    if (Results*Page>Total)
        {maxResults=Total}

    return <p className="text-warning">Displaying Results: {minResults} through {maxResults}</p>
};

export default ShowResults;