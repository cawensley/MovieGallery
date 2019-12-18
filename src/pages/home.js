import React, {useState,useEffect,useRef} from 'react';
import Cardlist from "../molecules/cardlist";
import movieAPI from "../atoms/movieAPI";
import PageTitle from "../atoms/pageTitle";
import ShowResults from "../atoms/ShowResults";
import PageLoading from "../atoms/pageLoading";
import PageChange from "../Redux/actions/PageChange";
import ResultsChange from "../Redux/actions/ResultsChange";
import SearchChange from "../Redux/actions/SearchChange";
import store from "../Redux/store";

const Home = () => {
    const [moviestoDisplay, setmoviestoDisplay] = useState("");
    const [PageArray,setPageArray]=useState([1]);
    const ResultsArray=[10,20,50];
    const [TotalResults,setTotalResults]=useState();
    const [FetchSuccess,setFetchSuccess]=useState(false);
    const [isLoading,setisLoading]=useState(false);
    const [userInput,setUserInput]=useState(store.getState().search);
    const [filteredMovies,setfilteredMovies]=useState([]);
    const filterTerm=useRef("");
    const TypeFilterArray=["movie","series","game"];
    const filterType=useRef("");

    async function getmovieData() {
        setisLoading(true);
        store.dispatch(SearchChange(userInput));
        const rawData = await fetch(`https://www.omdbapi.com/?s=${userInput}&apikey=${movieAPI}`)
            .then(response => response.json());
        setTotalResults(rawData.totalResults);

        var wasFetchSuccess = (rawData.Response === "True");
        setFetchSuccess(wasFetchSuccess);

        const TotalPages = Math.ceil(rawData.totalResults/store.getState().results);
        let TotalPagesArray = [];
        for (var i=1;i<=TotalPages;i++) {TotalPagesArray.push(i)}
        setPageArray(TotalPagesArray);

        let PagestoFetch = [];
        const TotalFetches = Math.ceil(rawData.totalResults/10);
        for (var z=(store.getState().page-1)*(store.getState().results/10)+1;z<=store.getState().page*store.getState().results/10;z++) {
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
    useEffect (()=> {if (store.getState().search!==null) {getmovieData()} window.scrollTo(0,0)},[]);

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
                   onKeyPress={event=>{if (event.key === "Enter") {store.dispatch(PageChange(1));getmovieData()}}}/>
            <button type="submit" value="Submit" className="btn btn-primary btn-sm"
                    onClick={()=>{store.dispatch(PageChange(1));getmovieData()}}>Title Search</button>
            <br/>
            <h2 className="text-warning">No Searches Matching: {store.getState().search}</h2>
        </div>
    ) : (
        <div className="container-fluid p-padding text-center">
            <div className="row">
                <div className="col-xl-3"></div>
                <div className="col-xl-3 col-md-6">
                    <PageTitle Title={'Search Movies'}/>
                    <input type="text" placeholder="Enter a movie title" className="h6" onChange={event=>setUserInput(event.target.value)}
                           onKeyPress={event=>{if (event.key === "Enter") {store.dispatch(PageChange(1));getmovieData()}}}/>
                    <button type="submit" value="Submit" className="btn btn-primary btn-sm"
                            onClick={()=>{store.dispatch(PageChange(1));getmovieData()}}>Title Search</button>
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
                        <select className="ml-1" value={store.getState().results}
                                onChange={event => {store.dispatch(PageChange(1));store.dispatch(ResultsChange(event.target.value));getmovieData()}}>
                            {ResultsArray.map(item=>(<option key={item} value={item}>{item}</option>))}
                        </select>
                    </label>
                    <br/>
                    <label className="text-warning"> Page:
                        <select className="ml-1 my-2" value={store.getState().page}
                                onChange={event =>{store.dispatch(PageChange(event.target.value));getmovieData()}}>
                            {PageArray.map(item=>(<option key={item} value={item}>{item}</option>))}
                        </select>
                    </label>
                    <p className="text-warning">Searches Matching: "{store.getState().search}"</p>
                    <ShowResults Page={store.getState().page} Results={store.getState().results} Total={TotalResults}/>
                </div>
                <div className="col-xl-3"></div>
            </div>
            <Cardlist movies={filteredMovies}/>
        </div>
    )
};

export default Home;