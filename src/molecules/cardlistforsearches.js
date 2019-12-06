import React from 'react';
import Cardforsearches from './cardforsearches';

const Cardlistforsearches = ({ movies }) => {
    return (
        <div>
            {
                movies.map((user, i) => {
                    return (
                        <Cardforsearches
                            key={i}
                            Title={movies[i].Title}
                            Year={movies[i].Year}
                            id={movies[i].imdbID}
                            Type={movies[i].Type}
                            Poster={movies[i].Poster}
                        />
                    );
                })
            }
        </div>
    );
};

export default Cardlistforsearches;