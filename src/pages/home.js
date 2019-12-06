import React, { useState, useEffect} from 'react';
import Cardlistforsearches from "../molecules/cardlistforsearches";
import movieAPI from "../atoms/movieAPI";
import PageTitle from "../atoms/pageTitle";

const Home = () => {
    const [moviestoDisplay, setmoviestoDisplay] = useState("");
    const [userInput,setUserInput]=useState(localStorage.getItem(`searchString`));

    async function getmovieData() {
        localStorage.setItem(`searchString`,userInput);
        const rawData = await fetch(`https://www.omdbapi.com/?s=${userInput}&apikey=${movieAPI}`)
            .then(response => response.json());
        setmoviestoDisplay(rawData);
    }

    //eslint-disable-next-line
    useEffect (()=> {if (userInput!==null) {getmovieData()}},[]);

    return (!moviestoDisplay || moviestoDisplay.Response === "False") ? (
        <div className="p-padding text-center">
            <PageTitle Title={'Search Movies'}/>
            <input type="text" size="15" className="h6" onChange={event=>setUserInput(event.target.value)}
                   onKeyPress={event=>{if (event.key === "Enter") {getmovieData()}}}/>
            <button type="submit" value="Submit" className="btn btn-primary btn-sm"
                    onClick={()=>getmovieData()}>Title Search</button>
            <br/>
            <h2 className="text-warning">No Searches Matching: {localStorage.getItem(`searchString`)}</h2>
        </div>
        ) : (
        <div className="p-padding text-center">
            <PageTitle Title={'Search Movies'}/>
            <input type="text" size="15" className="h6" onChange={event=>setUserInput(event.target.value)}
                   onKeyPress={event=>{if (event.key === "Enter") {getmovieData()}}}/>
            <button type="submit" value="Submit" className="btn btn-primary btn-sm"
                    onClick={()=>getmovieData()}>Title Search</button>
            <br/>
            <h2 className="text-warning">Total Search Results: {moviestoDisplay.totalResults}</h2>
            <h2 className="text-warning">Total Searches Displayed: {moviestoDisplay.Search.length}</h2>
            <h2 className="text-warning">Searched Phrase: {localStorage.getItem(`searchString`)}</h2>
            <br/>
            <Cardlistforsearches movies={moviestoDisplay.Search}/>
        </div>
    )
};

export default Home;