import React, { useState, useEffect} from 'react';
import Cardlist from "../molecules/cardlist";
import movieAPI from "../atoms/movieAPI";
import PageTitle from "../atoms/pageTitle";

const Home = () => {
    const [moviestoDisplay, setmoviestoDisplay] = useState("");
    const [userInput,setUserInput]=useState(localStorage.getItem(`searchString`));
    const [PageSelected,setPageSelected]=useState(localStorage.getItem('PageSelected') || 1);
    const [PageArray,setPageArray]=useState([1]);
    const [ResultsSelected,setResultsSelected]=useState(localStorage.getItem('ResultsSelected') || 10);
    const ResultsArray=[10,20,50];
    const [TotalResults,setTotalResults]=useState();

    async function getmovieData() {
        localStorage.setItem(`searchString`,userInput);
        localStorage.setItem('PageSelected',PageSelected);
        localStorage.setItem('ResultsSelected',ResultsSelected);
        const rawData = await fetch(`https://www.omdbapi.com/?s=${userInput}&apikey=${movieAPI}`)
            .then(response => response.json());
        setTotalResults(rawData.totalResults);

        const TotalPages = Math.trunc(rawData.totalResults/ResultsSelected)+1;
        let TotalPagesArray = [];
        for (var i=1;i<=TotalPages;i++) {TotalPagesArray.push(i)}
        setPageArray(TotalPagesArray);

        let PagestoFetch = [];
        for (var z=(PageSelected-1)*(ResultsSelected/10)+1;z<=PageSelected*ResultsSelected/10;z++) {PagestoFetch.push(z)}

        let TotalMoviestoDisplay = [];
        for (var q=0;q<PagestoFetch.length;q++) {
            const MovieGrouping = await fetch(`https://www.omdbapi.com/?s=${userInput}&page=${PagestoFetch[q]}&apikey=${movieAPI}`)
                .then(response => response.json());
            for (var d=0;d<MovieGrouping.Search.length;d++) {TotalMoviestoDisplay.push(MovieGrouping.Search[d])}}
        setmoviestoDisplay(TotalMoviestoDisplay);
    }

    //eslint-disable-next-line
    useEffect (()=> {if (userInput!==null) {getmovieData()} window.scrollTo(0,0)},[PageSelected,ResultsSelected]);

    return (!moviestoDisplay) ? (
        <div className="container-fluid p-padding text-center">
            <PageTitle Title={'Search Movies'}/>
            <input type="text" size="15" className="h6" onChange={event=>setUserInput(event.target.value)}
                   onKeyPress={event=>{if (event.key === "Enter") {getmovieData()}}}/>
            <button type="submit" value="Submit" className="btn btn-primary btn-sm"
                    onClick={()=>{setPageSelected(1);getmovieData()}}>Title Search</button>
            <br/>
            <h2 className="text-warning">No Searches Matching: {localStorage.getItem(`searchString`)}</h2>
        </div>
    ) : (
        <div className="container-fluid p-padding text-center">
            <div className="row">
                <div className="col-xl-3"></div>
                <div className="col-xl-3 col-md-6">
                    <PageTitle Title={'Search Movies'}/>
                    <input type="text" size="15" className="h6" onChange={event=>setUserInput(event.target.value)}
                           onKeyPress={event=>{if (event.key === "Enter") {getmovieData()}}}/>
                    <button type="submit" value="Submit" className="btn btn-primary btn-sm"
                                onClick={()=>{setPageSelected(1);getmovieData()}}>Title Search</button>
                </div>
                <div className="col-xl-3 col-md-6 text-md-left">
                    <p className="text-warning">Total Search Results: {TotalResults}</p>
                    <p className="text-warning">Total Pages: {PageArray.length}</p>
                    <label className="text-warning">Results per Page:
                        <select className="ml-1" value={ResultsSelected} onChange={event => setResultsSelected(event.target.value)}>
                            {ResultsArray.map(item=>(<option key={item} value={item}>{item}</option>))}
                        </select>
                    </label>
                    <br/>
                    <label className="text-warning"> Page:
                        <select className="ml-1" value={PageSelected} onChange={event => setPageSelected(event.target.value)}>
                            {PageArray.map(item=>(<option key={item} value={item}>{item}</option>))}
                        </select>
                    </label>
                    <p className="text-warning">Searches Matching: "{localStorage.getItem(`searchString`)}"</p>
                </div>
                <div className="col-xl-3"></div>
            </div>
            <Cardlist movies={moviestoDisplay}/>
        </div>
    )
};

export default Home;