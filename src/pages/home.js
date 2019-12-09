import React, { useState, useEffect} from 'react';
import Cardlistforsearches from "../molecules/cardlistforsearches";
import movieAPI from "../atoms/movieAPI";
import PageTitle from "../atoms/pageTitle";

const Home = () => {
    const [moviestoDisplay, setmoviestoDisplay] = useState("");
    const [userInput,setUserInput]=useState(localStorage.getItem(`searchString`));
    const [PageSelected,setPageSelected]=useState(localStorage.getItem('PageSelected'));
    const PageChoices=[1,2,3,4,5];
    const [ResultsSelected,setResultsSelected]=useState(10);
    const ResultsDisplayed=[10];

    async function getmovieData() {
        localStorage.setItem(`searchString`,userInput);
        localStorage.setItem('PageSelected',PageSelected);
        const rawData = await fetch(`https://www.omdbapi.com/?s=${userInput}&page=${PageSelected}&apikey=${movieAPI}`)
            .then(response => response.json());
        setmoviestoDisplay(rawData);
    }

    //eslint-disable-next-line
    useEffect (()=> {if (userInput!==null) {getmovieData()} window.scrollTo(0,0)},[PageSelected]);

    return (!moviestoDisplay || moviestoDisplay.Response === "False") ? (
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
                    <p className="text-warning">Total Search Results: {moviestoDisplay.totalResults}</p>
                    <p className="text-warning">Total Pages: {Math.trunc(moviestoDisplay.totalResults/ResultsSelected)+1}</p>
                    <label className="text-warning">Results per Page:
                        <select className="ml-1" value={ResultsSelected} onChange={event => setResultsSelected(event.target.value)}>
                            {ResultsDisplayed.map(item=>(<option key={item} value={item}>{item}</option>))}
                        </select>
                    </label>
                    <br/>
                    <label className="text-warning"> Page:
                        <select className="ml-1" value={PageSelected} onChange={event => setPageSelected(event.target.value)}>
                            {PageChoices.map(item=>(<option key={item} value={item}>{item}</option>))}
                        </select>
                    </label>
                    <p className="text-warning">Searches Matching: "{localStorage.getItem(`searchString`)}"</p>
                </div>
                <div className="col-xl-3"></div>
            </div>
            <Cardlistforsearches movies={moviestoDisplay.Search}/>
        </div>
    )
};

export default Home;