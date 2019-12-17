import React, { useState, useEffect,useRef,useContext} from 'react';
import Cardlist from "../molecules/cardlist";
import movieAPI from "../atoms/movieAPI";
import PageTitle from "../atoms/pageTitle";
import ShowResults from "../atoms/ShowResults";
import PageLoading from "../atoms/pageLoading";
import MovieContext from "../store/MovieContext";

const Home = () => {
    const {UserData,setUserData} = useContext(MovieContext);
    const [moviestoDisplay, setmoviestoDisplay] = useState("");
    const [PageArray,setPageArray]=useState([1]);
    const ResultsArray=[10,20,50];
    const [TotalResults,setTotalResults]=useState();
    const [FetchSuccess,setFetchSuccess]=useState(false);
    const [isLoading,setisLoading]=useState(false);
    const [userInput,setUserInput]=useState(UserData.SearchString);
    const [filteredMovies,setfilteredMovies]=useState([]);
    const filterTerm=useRef("");
    const TypeFilterArray=["movie","series","game"];
    const filterType=useRef("");

    async function getmovieData() {
        setisLoading(true);
        setUserData({type:"SearchChange",payload:userInput});
        const rawData = await fetch(`https://www.omdbapi.com/?s=${userInput}&apikey=${movieAPI}`)
            .then(response => response.json());
        setTotalResults(rawData.totalResults);

        var wasFetchSuccess = (rawData.Response === "True");
        setFetchSuccess(wasFetchSuccess);

        const TotalPages = Math.ceil(rawData.totalResults/UserData.ResultsSelected);
        let TotalPagesArray = [];
        for (var i=1;i<=TotalPages;i++) {TotalPagesArray.push(i)}
        setPageArray(TotalPagesArray);

        let PagestoFetch = [];
        const TotalFetches = Math.ceil(rawData.totalResults/10);
        for (var z=(UserData.PageSelected-1)*(UserData.ResultsSelected/10)+1;z<=UserData.PageSelected*UserData.ResultsSelected/10;z++) {
            if (z<=TotalFetches) {PagestoFetch.push(z)}}

        let TotalMoviestoDisplay = [];
        for (var q=0;q<PagestoFetch.length;q++) {
            const MovieGrouping = await fetch(`https://www.omdbapi.com/?s=${userInput}&page=${PagestoFetch[q]}&apikey=${movieAPI}`)
                .then(response => response.json());
            for (var d=0;d<MovieGrouping.Search.length;d++) {TotalMoviestoDisplay.push(MovieGrouping.Search[d])}}
        setmoviestoDisplay(TotalMoviestoDisplay);
        filterTerm.current = "";
        filterType.current = "";
        setfilteredMovies(TotalMoviestoDisplay);
        setisLoading(false);
    }

    //eslint-disable-next-line
    useEffect (()=> {if (UserData.SearchString!==null) {getmovieData()} window.scrollTo(0,0)},[UserData.PageSelected,UserData.ResultsSelected]);

    function onFilterChange () {
        const FilteredMovieArray1 = moviestoDisplay.filter(movie=>{
            return movie.Title.toLowerCase().includes(filterTerm.current);});
        const FilteredMovieArray2 = FilteredMovieArray1.filter(movie=>{
            return movie.Type.includes(filterType.current)});
        setfilteredMovies(FilteredMovieArray2);
    }

    if (isLoading) {return(<PageLoading/>)}

    return (!moviestoDisplay || !FetchSuccess) ? (
        <div className="container-fluid p-padding text-center">
            <PageTitle Title={'Search Movies'}/>
            <input type="text" size="15" className="h6" onChange={event=>setUserInput(event.target.value)}
                   onKeyPress={event=>{if (event.key === "Enter") {setUserData({type:"PageChange",payload:1});getmovieData()}}}/>
            <button type="submit" value="Submit" className="btn btn-primary btn-sm"
                    onClick={()=>{setUserData({type:"PageChange",payload:1});getmovieData()}}>Title Search</button>
            <br/>
            <h2 className="text-warning">No Searches Matching: {UserData.SearchString}</h2>
        </div>
    ) : (
        <div className="container-fluid p-padding text-center">
            <div className="row">
                <div className="col-xl-3"></div>
                <div className="col-xl-3 col-md-6">
                    <PageTitle Title={'Search Movies'}/>
                    <input type="text" placeholder="Enter a movie title" className="h6" onChange={event=>setUserInput(event.target.value)}
                           onKeyPress={event=>{if (event.key === "Enter") {setUserData({type:"PageChange",payload:1});getmovieData()}}}/>
                    <button type="submit" value="Submit" className="btn btn-primary btn-sm"
                            onClick={()=>{setUserData({type:"PageChange",payload:1});getmovieData()}}>Title Search</button>
                    <h6 className="text-white mt-2" >Filter Title By:</h6>
                    <input type="search" placeholder="Enter filter term" className="h6"
                           onChange={event=>{filterTerm.current = event.target.value.toLowerCase();onFilterChange()}}/>
                    <br/>
                    <label className="text-white h6">Filter Type By:
                        <select className="my-2" value={filterType.current}
                                onChange={event => {filterType.current=event.target.value;onFilterChange()}}>
                            <option key={""} value={""}>Show All</option>
                            {TypeFilterArray.map(item=>(<option key={item} value={item}>{item}</option>))}
                        </select>
                    </label>
                </div>
                <div className="col-xl-3 col-md-6 text-md-left">
                    <p className="text-warning">Total Search Results: {TotalResults}</p>
                    <p className="text-warning">Total Pages: {PageArray.length}</p>
                    <label className="text-warning">Results per Page:
                        <select className="ml-1" value={UserData.ResultsSelected}
                                onChange={event => {setUserData({type:"PageChange",payload:1});setUserData({type:"ResultsChange",payload:event.target.value})}}>
                            {ResultsArray.map(item=>(<option key={item} value={item}>{item}</option>))}
                        </select>
                    </label>
                    <br/>
                    <label className="text-warning"> Page:
                        <select className="ml-1 my-2" value={UserData.PageSelected}
                                onChange={event =>setUserData({type:"PageChange",payload:event.target.value})}>
                            {PageArray.map(item=>(<option key={item} value={item}>{item}</option>))}
                        </select>
                    </label>
                    <p className="text-warning">Searches Matching: "{UserData.SearchString}"</p>
                    <ShowResults Page={UserData.PageSelected} Results={UserData.ResultsSelected} Total={TotalResults}/>
                </div>
                <div className="col-xl-3"></div>
            </div>
            <Cardlist movies={filteredMovies}/>
        </div>
    )
};

export default Home;