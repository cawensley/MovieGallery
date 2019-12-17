import React, {useState,useEffect,useRef} from 'react';
import Cardlist from "../molecules/cardlist";
import movieAPI from "../atoms/movieAPI";
import PageTitle from "../atoms/pageTitle";
import ShowResults from "../atoms/ShowResults";
import PageLoading from "../atoms/pageLoading";
import {connect} from 'react-redux';
import PageChange from "../Redux/actions/PageChange";
import ResultsChange from "../Redux/actions/ResultsChange";
import SearchChange from "../Redux/actions/SearchChange";
import MovieChange from "../Redux/actions/MovieChange";
import FavoritesChange from "../Redux/actions/FavoritesChange";

const Home = (props) => {
    const [moviestoDisplay, setmoviestoDisplay] = useState("");
    const [PageArray,setPageArray]=useState([1]);
    const ResultsArray=[10,20,50];
    const [TotalResults,setTotalResults]=useState();
    const [FetchSuccess,setFetchSuccess]=useState(false);
    const [isLoading,setisLoading]=useState(false);
    const [userInput,setUserInput]=useState(props.search);
    const [filteredMovies,setfilteredMovies]=useState([]);
    const filterTerm=useRef("");
    const TypeFilterArray=["movie","series","game"];
    const filterType=useRef("");

    async function getmovieData() {
        setisLoading(true);
        props.setSearchString(userInput);
        const rawData = await fetch(`https://www.omdbapi.com/?s=${userInput}&apikey=${movieAPI}`)
            .then(response => response.json());
        setTotalResults(rawData.totalResults);

        var wasFetchSuccess = (rawData.Response === "True");
        setFetchSuccess(wasFetchSuccess);

        const TotalPages = Math.ceil(rawData.totalResults/props.results);
        let TotalPagesArray = [];
        for (var i=1;i<=TotalPages;i++) {TotalPagesArray.push(i)}
        setPageArray(TotalPagesArray);

        let PagestoFetch = [];
        const TotalFetches = Math.ceil(rawData.totalResults/10);
        for (var z=(props.page-1)*(props.results/10)+1;z<=props.page*props.results/10;z++) {
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
    useEffect (()=> {if (props.search!==null) {getmovieData()} window.scrollTo(0,0)},[props.page,props.results]);

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
                   onKeyPress={event=>{if (event.key === "Enter") {props.setPageChange(1);getmovieData()}}}/>
            <button type="submit" value="Submit" className="btn btn-primary btn-sm"
                    onClick={()=>{props.setPageChange(1);getmovieData()}}>Title Search</button>
            <br/>
            <h2 className="text-warning">No Searches Matching: {props.search}</h2>
        </div>
    ) : (
        <div className="container-fluid p-padding text-center">
            <div className="row">
                <div className="col-xl-3"></div>
                <div className="col-xl-3 col-md-6">
                    <PageTitle Title={'Search Movies'}/>
                    <input type="text" placeholder="Enter a movie title" className="h6" onChange={event=>setUserInput(event.target.value)}
                           onKeyPress={event=>{if (event.key === "Enter") {props.setPageChange(1);getmovieData()}}}/>
                    <button type="submit" value="Submit" className="btn btn-primary btn-sm"
                            onClick={()=>{props.setPageChange(1);getmovieData()}}>Title Search</button>
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
                        <select className="ml-1" value={props.results}
                                onChange={event => {props.setPageChange(1);props.setResultsChange(event.target.value)}}>
                            {ResultsArray.map(item=>(<option key={item} value={item}>{item}</option>))}
                        </select>
                    </label>
                    <br/>
                    <label className="text-warning"> Page:
                        <select className="ml-1 my-2" value={props.page}
                                onChange={event =>props.setPageChange(event.target.value)}>
                            {PageArray.map(item=>(<option key={item} value={item}>{item}</option>))}
                        </select>
                    </label>
                    <p className="text-warning">Searches Matching: "{props.search}"</p>
                    <ShowResults Page={props.page} Results={props.results} Total={TotalResults}/>
                </div>
                <div className="col-xl-3"></div>
            </div>
            <Cardlist movies={filteredMovies} props={props}/>
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

export default connect(mapStatetoProps,mapDispatchtoProps)(Home);