import React, {useState, useEffect} from 'react';
import movieAPI from "../atoms/movieAPI";
import PageTitle from "../atoms/pageTitle";
import AddRemoveButton from "../molecules/AddRemoveButton";

const Details = () => {
    const [movietoDisplay, setmovietoDisplay] = useState(null);

    async function getmovieData() {
        const displaymovieID = localStorage.getItem('movieID');
        const rawData = await fetch(`https://www.omdbapi.com/?i=${displaymovieID}&apikey=${movieAPI}`)
            .then(response => response.json());
        setmovietoDisplay(rawData);
    }

    //eslint-disable-next-line
    useEffect (()=> {getmovieData()},[]);

    return (!movietoDisplay || !localStorage.getItem('movieID')) ? (
        <div className="p-padding text-center">
            <PageTitle Title={'Movie Details'}/>
            <h2 className="text-warning">No Movie to Display</h2>
        </div>
    ) : (
        <div className="container-fluid p-padding text-center">
            <PageTitle Title={'Movie Details'}/>
            <img alt='Error Loading' src={movietoDisplay.Poster} height={400}/><br/>
            <AddRemoveButton id={movietoDisplay.imdbID}/>
            <div className="row justify-content-center ">
                <table className="table table-striped table-bordered text-white my-4 col-md-10 col-lg-6 bg-secondary">
                    <tbody>
                    <tr className="h5 text-warning">
                        <td>Title:</td>
                        <td>{movietoDisplay.Title}</td>
                    </tr>
                    <tr className="h6">
                        <td>Type:</td>
                        <td>{movietoDisplay.Type}</td>
                    </tr>
                    <tr className="h6">
                        <td>Released:</td>
                        <td>{movietoDisplay.Released}</td>
                    </tr>
                    <tr className="h6">
                        <td>Runtime:</td>
                        <td>{movietoDisplay.Runtime}</td>
                    </tr>
                    <tr className="h6">
                        <td>Rated:</td>
                        <td>{movietoDisplay.Rated}</td>
                    </tr>
                    <tr className="h6">
                        <td>Genre:</td>
                        <td>{movietoDisplay.Genre}</td>
                    </tr>
                    <tr className="h6">
                        <td>Director(s):</td>
                        <td>{movietoDisplay.Director}</td>
                    </tr>
                    <tr className="h6">
                        <td>Writer(s):</td>
                        <td>{movietoDisplay.Writer}</td>
                    </tr>
                    <tr className="h6">
                        <td>Actor(s):</td>
                        <td>{movietoDisplay.Actors}</td>
                    </tr>
                    <tr className="h6">
                        <td>imdb ID:</td>
                        <td>{movietoDisplay.imdbID}</td>
                    </tr>
                    <tr className="h6">
                        <td>imdb Rating:</td>
                        <td>{movietoDisplay.imdbRating}</td>
                    </tr>
                    <tr className="h6">
                        <td>Plot:</td>
                        <td>{movietoDisplay.Plot}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
};

export default Details;