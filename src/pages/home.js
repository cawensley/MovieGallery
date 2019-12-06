import React, { useState, useEffect} from 'react';
import Cardlistforsearches from "../molecules/cardlistforsearches";
import movieAPI from "../atoms/movieAPI";
import PageTitle from "../atoms/pageTitle";

const Home = () => {
    const [moviestoDisplay, setmoviestoDisplay] = useState("");
    const [userInput,setUserInput]=useState(localStorage.getItem(`searchString`));
    const [PageSelected,setPageSelected]=useState(1);

    async function getmovieData() {
        localStorage.setItem(`searchString`,userInput);
        const rawData = await fetch(`https://www.omdbapi.com/?s=${userInput}&page=${PageSelected}&apikey=${movieAPI}`)
            .then(response => response.json());
        setmoviestoDisplay(rawData);
    }

    //eslint-disable-next-line
    useEffect (()=> {if (userInput!==null) {getmovieData()} window.scrollTo(0,0)},[PageSelected]);

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
            <div className="row">
                <div className="col-6 text-right">
                    <PageTitle Title={'Search Movies'}/>
                    <input type="text" size="15" className="h6" onChange={event=>setUserInput(event.target.value)}
                           onKeyPress={event=>{if (event.key === "Enter") {getmovieData()}}}/>
                    <button type="submit" value="Submit" className="btn btn-primary btn-sm"
                            onClick={()=>getmovieData()}>Title Search</button>
                </div>
                <div className="col-6 text-left">
                    <p className="text-warning">Total Search Results: {moviestoDisplay.totalResults}</p>
                    <p className="text-warning">Total Pages: {Math.trunc(moviestoDisplay.totalResults/10)+1}</p>
                    <p className="text-warning">Page Displayed: {PageSelected}</p>
                    <label className="text-warning"> Page Selector__
                        <select onChange={event => setPageSelected(event.target.value)}>
                            <option id={1} value={1}>Page 1</option>
                            <option id={2} value={2}>Page 2</option>
                            <option id={3} value={3}>Page 3</option>
                            <option id={4} value={4}>Page 4</option>
                        </select>
                    </label>
                    <p className="text-warning">Searched Phrase: {localStorage.getItem(`searchString`)}</p>
                </div>
            </div>
            <Cardlistforsearches movies={moviestoDisplay.Search}/>
        </div>
    )
};

export default Home;