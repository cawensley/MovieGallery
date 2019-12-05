import React, {Component} from 'react';
import movieAPI from "../atoms/movieAPI";
import PageTitle from "../atoms/pageTitle";

class Details extends Component {
    constructor() {
        super();
        this.state = {
            isLoading: false,
            error: null,
            input: null,
            movietoDisplay: null,
        }
    }

    componentDidMount = () => {
        this.setState({isLoading: true});
        const displayMovieID = localStorage.getItem(`movieID`);
        fetch(`https://www.omdbapi.com/?i=${displayMovieID}&apikey=${movieAPI}`)
            .then(response=> {
                if (response.ok) {return response.json();}
                else {throw new Error(`Error with API call`);}})
            .then(data => this.setState({ movietoDisplay: data,isLoading: false}))
            .catch(error => this.setState({error,isLoading: false}));
    };

    onButtonAdd = () => {
        var FavMovieArray = JSON.parse(localStorage.getItem("favoriteArray"));
        FavMovieArray.push(localStorage.getItem(`movieID`));
        localStorage.setItem("favoriteArray",JSON.stringify(FavMovieArray));
    };

    render() {
        const { movietoDisplay,isLoading,error} = this.state;

        if (error) {return (
            <div className="text-center text-white p-padding">
                <p>{error.message}</p>
            </div>)};

        if (isLoading) {return (<p className="text-center text-white p-padding">
            <i className="fas fa-5x fa-cog fa-spin"></i></p>)};

        return (!movietoDisplay) ? (
            <div className="p-padding text-center">
                <h1 className="text-white">No Movie to Display</h1>
            </div>
        ) : (
            <div className="container-fluid p-padding text-center">
                <PageTitle Title={'Movie Details'}/>
                <img alt='Error Loading' src={movietoDisplay.Poster} height={400} />
                <button type="submit" value="Submit" className="btn btn-primary m-4"
                        onClick={this.onButtonAdd}>Add to Favorites</button>
                <div className="row justify-content-center align-content-center">
                    <table className="table table-striped table-bordered text-white my-4 col-md-10 col-lg-6">
                        <tbody>
                                <tr className="h5 text-warning">
                                    <td>Title:</td>
                                    <td>{movietoDisplay.Title}</td>
                                </tr>
                                <tr className="h6">
                                    <td>Released:</td>
                                    <td>{movietoDisplay.Released}</td>
                                </tr><tr className="h6">
                                    <td>Runtime:</td>
                                    <td>{movietoDisplay.Runtime}</td>
                                </tr><tr className="h6">
                                    <td>Rated:</td>
                                    <td>{movietoDisplay.Rated}</td>
                                </tr><tr className="h6">
                                    <td>Type:</td>
                                    <td>{movietoDisplay.Type}</td>
                                </tr><tr className="h6">
                                    <td>imdbID:</td>
                                    <td>{movietoDisplay.imdbID}</td>
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
    }
}

export default Details;