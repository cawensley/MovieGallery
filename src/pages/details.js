import React, {useState, useEffect} from 'react';
import movieAPI from "../atoms/movieAPI";
import PageTitle from "../atoms/pageTitle";
import "./details.scss";
import PageLoading from "../atoms/pageLoading";
import {connect} from 'react-redux';
import AddRemoveButton from "../molecules/AddRemoveButton";
import PageChange from "../Redux/actions/PageChange";
import ResultsChange from "../Redux/actions/ResultsChange";
import SearchChange from "../Redux/actions/SearchChange";
import MovieChange from "../Redux/actions/MovieChange";
import FavoritesChange from "../Redux/actions/FavoritesChange";

const Details = (props) => {
    const [movietoDisplay, setmovietoDisplay] = useState(null);
    const [isLoading,setisLoading]=useState(false);
    const [PosterImage,setPosterImage]=useState(require(`../images/imageBlank.jpg`));

    async function getmovieData() {
        setisLoading(true);
        const rawData = await fetch(`https://www.omdbapi.com/?i=${props.movie}&apikey=${movieAPI}`)
            .then(response => response.json());
        setmovietoDisplay(rawData);
        if(rawData.Poster!=="N/A") {setPosterImage(rawData.Poster)}
        setisLoading(false);
    }

    //eslint-disable-next-line
    useEffect (()=> {getmovieData(); window.scrollTo(0,0)},[]);

    if (isLoading) {return(<PageLoading/>)}

    return (!movietoDisplay || !props.movie) ? (
        <div className="container-fluid p-padding text-center">
            <PageTitle Title={'Movie Details'}/>
            <h2 className="text-warning">No Movie to Display</h2>
        </div>
    ) : (
        <div className="container-fluid p-padding text-center ">
            <PageTitle Title={'Movie Details'}/>
            <img className="p-movieimage-height p-movieimage-width bg-dark" alt='Error Loading' src={PosterImage}/><br/>
            <AddRemoveButton id={movietoDisplay.imdbID} props={props}/>
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
                        <td><a href={`https://www.imdb.com/title/${movietoDisplay.imdbID}/`} className="p-hyperLink-color"
                               rel="noopener noreferrer" target="_blank">{movietoDisplay.imdbID}</a></td>
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


const mapStatetoProps = ({page,results,search,movie,favorites})=>({page,results,search,movie,favorites});
const mapDispatchtoProps = dispatch => ({
    setPageChange: page=>dispatch(PageChange(page)),
    setResultsChange: results=>dispatch(ResultsChange(results)),
    setSearchString: string=>dispatch(SearchChange(string)),
    setMovieChange: movie=>dispatch(MovieChange(movie)),
    setFavoritesArray: favoritemovies=>dispatch(FavoritesChange(favoritemovies))
});

export default connect(mapStatetoProps,mapDispatchtoProps)(Details);