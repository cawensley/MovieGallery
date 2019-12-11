import React, {useState, useEffect} from 'react';
import movieAPI from "../atoms/movieAPI";
import PageTitle from "../atoms/pageTitle";
import AddRemoveButton from "../molecules/AddRemoveButton";
import "./details.css";
import PageLoading from "../atoms/pageLoading";

const Details = () => {
    const [movietoDisplay, setmovietoDisplay] = useState(null);
    const [isLoading,setisLoading]=useState(false);

    async function getmovieData() {
        setisLoading(true);
        const displaymovieID = localStorage.getItem('movieID');
        const rawData = await fetch(`https://www.omdbapi.com/?i=${displaymovieID}&apikey=${movieAPI}`)
            .then(response => response.json());
        setmovietoDisplay(rawData);
        setisLoading(false);
    }

    //eslint-disable-next-line
    useEffect (()=> {getmovieData(); window.scrollTo(0,0)},[]);

    if (isLoading) {return(<PageLoading/>)}

    return (!movietoDisplay || !localStorage.getItem('movieID')) ? (
        <div className="container-fluid p-padding text-center">
            <PageTitle Title={'Movie Details'}/>
            <h2 className="text-warning">No Movie to Display</h2>
        </div>
    ) : (
        <div className="container-fluid p-padding text-center ">
            <PageTitle Title={'Movie Details'}/>
            <img className="p-movieimage-height p-movieimage-width bg-dark" alt='Error Loading' src={movietoDisplay.Poster}/><br/>
            <AddRemoveButton id={movietoDisplay.imdbID}/>
            <div className="row justify-content-center ">
                <table className="table table-striped table-bordered text-white my-4 col-md-10 col-lg-6 bg-secondary">
                    <tbody>
                    <tr className="h5 text-warning">
                        <td className="align-middle">Title:</td>
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
                        <td className="align-middle">Director(s):</td>
                        <td>{movietoDisplay.Director}</td>
                    </tr>
                    <tr className="h6">
                        <td className="align-middle">Writer(s):</td>
                        <td>{movietoDisplay.Writer}</td>
                    </tr>
                    <tr className="h6">
                        <td className="align-middle">Actor(s):</td>
                        <td>{movietoDisplay.Actors}</td>
                    </tr>
                    <tr className="h6">
                        <td>imdb ID:</td>
                        <td><a href={`https://www.imdb.com/title/${movietoDisplay.imdbID}/`} className="hyperLink">{movietoDisplay.imdbID}</a></td>
                    </tr >
                    <tr className="h6">
                        <td>imdb Rating:</td>
                        <td className="align-middle">{movietoDisplay.imdbRating}</td>
                    </tr>
                    <tr className="h6">
                        <td className="align-middle">Plot:</td>
                        <td>{movietoDisplay.Plot}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
};

export default Details;