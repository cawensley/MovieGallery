import React, {Component} from 'react';
import CardList from "../atoms/cardlist";

const movieAPI = "bf0372ee";

class Home extends Component {
    constructor() {
        super();
        this.state = {
            isLoading: false,
            error: null,
            input: null,
            moviestoDisplay: null,
        }
    }

    onButtonSubmit = () => {
        this.setState({isLoading: true});
        localStorage.setItem(`searchString`,this.state.input);
        fetch(`http://www.omdbapi.com/?s=${this.state.input}&apikey=${movieAPI}`)
            .then(response=> {
                if (response.ok) {return response.json();}
                else {throw new Error(`Error with API call`);}})
            .then(data => this.setState({ moviestoDisplay: data,isLoading: false}))
            .catch(error => this.setState({error,isLoading: false}));
    };

    componentDidMount() {
        this.setState({isLoading: true});
        console.log("Before Input is:",this.state.input);
        console.log("Stored Searchstring is:",localStorage.getItem(`searchString`));
        if (localStorage.getItem('searchString')) {
            this.setState({input: localStorage.getItem('searchString')})}
        if (this.state.input) {this.onButtonSubmit()}
        console.log("After Input is:",this.state.input);
        this.setState({isLoading: false});
    };

    onInputChange=(event) => {this.setState({input: event.target.value});};

    keyPressed=(event) => {if (event.key === "Enter") {this.onButtonSubmit()}};

    refreshPage = () => {
        localStorage.setItem(`searchString`,'');
        window.location.reload(true)
    };

    render() {
        const { moviestoDisplay,isLoading,error,input} = this.state;

        if (error) {return (
            <div className="text-center text-white p-padding">
                <p>{error.message}</p>
                <button type="button" value="Refresh" className="btn btn-primary mb-3" onClick={this.refreshPage}>Refresh</button>
            </div>)};

        if (isLoading) {return (<p className="text-center text-white p-padding">
            <i className="fas fa-5x fa-cog fa-spin"></i></p>)};

        return (!moviestoDisplay || moviestoDisplay.Response === "False") ? (
            <div className="p-padding text-center">
                <h1 className="text-white">Movie Gallery Website</h1>
                <input type="text" size="15" className="h6" onChange={this.onInputChange}
                       onKeyPress={this.keyPressed}/>
                <button type="submit" value="Submit" className="btn btn-primary btn-sm"
                        onClick={this.onButtonSubmit}>Title Search</button>
                <br/>
                <h2 className="text-white">http://www.omdbapi.com/?s={localStorage.getItem(`searchString`)}&apikey={movieAPI}</h2>
                <h2 className="text-warning">No Searches Matching: {localStorage.getItem(`searchString`)}</h2>
            </div>
            ) : (
            <div className="p-padding text-center">
                <h1 className="text-white">Movie Gallery Website</h1>
                <input type="text" size="15" className="h6" onChange={this.onInputChange}
                       onKeyPress={this.keyPressed}/>
                <button type="submit" value="Submit" className="btn btn-primary btn-sm"
                        onClick={this.onButtonSubmit}>Title Search</button>
                <br/>
                <h2 className="text-white">http://www.omdbapi.com/?s={localStorage.getItem(`searchString`)}&apikey={movieAPI}</h2>
                <h2 className="text-warning">Total Search Results: {moviestoDisplay.totalResults}</h2>
                <h2 className="text-warning">Total Searches Displayed: {moviestoDisplay.Search.length}</h2>
                <h2 className="text-warning">Searched Phrase: {localStorage.getItem(`searchString`)}</h2>
                <br/>
                <CardList movies={moviestoDisplay.Search}/>
            </div>
        )
    }
}

export default Home;