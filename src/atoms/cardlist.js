import React from 'react';
import Card from './card';

const CardList = ({ movies }) => {
    console.log("Cardlist = ",movies);
    return (
        <div>
            {
                movies.map((user, i) => {
                    return (
                        <Card
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

export default CardList;