import React, { useState, useEffect, useRef } from 'react';
import Cardlist from '../molecules/cardlist';
import movieAPI from '../atoms/movieAPI';
import PageTitle from '../atoms/pageTitle';
import ShowResults from '../atoms/ShowResults';
import PageLoading from '../atoms/pageLoading';
import PageChange from '../Redux/actions/PageChange';
import ResultsChange from '../Redux/actions/ResultsChange';
import SearchChange from '../Redux/actions/SearchChange';
import store from '../Redux/store';

const Home = () => {
  const [moviestoDisplay, setmoviestoDisplay] = useState('');
  const [PageArray, setPageArray] = useState([1]);
  const ResultsArray = [10, 20, 50];
  const [TotalResults, setTotalResults] = useState();
  const [FetchSuccess, setFetchSuccess] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const userInput = useRef(store.getState().search);
  const [filteredMovies, setfilteredMovies] = useState([]);
  const filterTerm = useRef('');
  const TypeFilterArray = ['movie', 'series', 'game'];
  const filterType = useRef('');

  async function getmovieData() {
    setisLoading(true);
    store.dispatch(SearchChange(userInput.current));
    const rawData = await fetch(`https://www.omdbapi.com/?s=${userInput.current}&apikey=${movieAPI}`)
      .then((response) => response.json());
    setTotalResults(rawData.totalResults);

    const wasFetchSuccess = (rawData.Response === 'True');
    setFetchSuccess(wasFetchSuccess);

    const TotalPages = Math.ceil(rawData.totalResults / store.getState().results);
    const TotalPagesArray = [];
    for (let i = 1; i <= TotalPages; i += 1) { TotalPagesArray.push(i); }
    setPageArray(TotalPagesArray);

    const PagestoFetch = [];
    const TotalFetches = Math.ceil(rawData.totalResults / 10);
    for (let z = (store.getState().page - 1) * (store.getState().results / 10) + 1;
      z <= (store.getState().page * store.getState().results) / 10; z += 1) {
      if (z <= TotalFetches) { PagestoFetch.push(z); }
    }

    const TotalMoviestoDisplay = [];
    const moviepromises = PagestoFetch.map((value) => {
      const moviebatch = fetch(`https://www.omdbapi.com/?s=${userInput.current}&page=${value}&apikey=${movieAPI}`)
        .then((response) => response.json())
        .then((data) => data.Search.map((singlemovie) => TotalMoviestoDisplay.push(singlemovie)));
      return (moviebatch);
    });
    await Promise.all(moviepromises);
    filterTerm.current = '';
    filterType.current = '';
    setmoviestoDisplay(TotalMoviestoDisplay);
    setfilteredMovies(TotalMoviestoDisplay);
    setisLoading(false);
  }

  // eslint-disable-next-line
    useEffect (()=> {if (store.getState().search!==null) {getmovieData()} window.scrollTo(0,0)},[]);

  function onFilterChange() {
    const FilteredMovieArray1 = moviestoDisplay.filter(
      (movie) => movie.Title.toLowerCase().includes(filterTerm.current),
    );
    const FilteredMovieArray2 = FilteredMovieArray1.filter(
      (movie) => movie.Type.includes(filterType.current),
    );
    setfilteredMovies(FilteredMovieArray2);
  }

  if (isLoading) { return (<PageLoading />); }

  return (!moviestoDisplay || !FetchSuccess) ? (
    <div className="container-fluid p-padding text-center">
      <PageTitle Title="Search Movies" />
      <input
        type="text"
        size="15"
        className="h6"
        onChange={(event) => { userInput.current = event.target.value; }}
        onKeyPress={(event) => { if (event.key === 'Enter') { store.dispatch(PageChange(1)); getmovieData(); } }}
      />
      <button
        type="submit"
        value="Submit"
        className="btn btn-primary btn-sm"
        onClick={() => { store.dispatch(PageChange(1)); getmovieData(); }}
      >
Title Search
      </button>
      <br />
      <h2 className="text-warning">
No Searches Matching:
        {store.getState().search}
      </h2>
    </div>
  ) : (
    <div className="container-fluid p-padding text-center">
      <div className="row">
        <div className="col-xl-3" />
        <div className="col-xl-3 col-md-6">
          <PageTitle Title="Search Movies" />
          <input
            type="text"
            placeholder="Enter a movie title"
            className="h6"
            onChange={(event) => { userInput.current = event.target.value; }}
            onKeyPress={(event) => { if (event.key === 'Enter') { store.dispatch(PageChange(1)); getmovieData(); } }}
          />
          <button
            type="submit"
            value="Submit"
            className="btn btn-primary btn-sm"
            onClick={() => { store.dispatch(PageChange(1)); getmovieData(); }}
          >
Title Search
          </button>
          <h6 className="text-white mt-2">Filter Title By:</h6>
          <input
            type="search"
            placeholder="Enter filter term"
            className="h6"
            onChange={(event) => {
              filterTerm.current = event.target.value.toLowerCase();
              onFilterChange();
            }}
          />
          <br />
          <label htmlFor="FilterType" className="text-white h6">
Filter Type By:
            <select
              id="FilterType"
              className="my-2"
              value={filterType.current}
              onChange={(event) => {
                filterType.current = event.target.value;
                onFilterChange();
              }}
            >
              <option key="" value="">Show All</option>
              {TypeFilterArray.map((item) => (<option key={item} value={item}>{item}</option>))}
            </select>
          </label>
        </div>
        <div className="col-xl-3 col-md-6 text-md-left">
          <p className="text-warning">
Total Search Results:
            {TotalResults}
          </p>
          <p className="text-warning">
Total Pages:
            {PageArray.length}
          </p>
          <label htmlFor="ResultsperPage" className="text-warning">
Results per Page:
            <select
              id="ResultsperPage"
              className="ml-1"
              value={store.getState().results}
              onChange={(event) => {
                store.dispatch(PageChange(1));
                store.dispatch(ResultsChange(event.target.value));
                getmovieData();
              }}
            >
              {ResultsArray.map((item) => (<option key={item} value={item}>{item}</option>))}
            </select>
          </label>
          <br />
          <label htmlFor="PageSelection" className="text-warning">
            {' '}
Page:
            <select
              id="PageSelection"
              className="ml-1 my-2"
              value={store.getState().page}
              onChange={(event) => {
                store.dispatch(PageChange(event.target.value));
                getmovieData();
              }}
            >
              {PageArray.map((item) => (<option key={item} value={item}>{item}</option>))}
            </select>
          </label>
          <p className="text-warning">
Searches Matching: &quot;
            {store.getState().search}
              &quot;
          </p>
          <ShowResults
            Page={+store.getState().page}
            Results={+store.getState().results}
            Total={+TotalResults}
          />
        </div>
        <div className="col-xl-3" />
      </div>
      <Cardlist movies={filteredMovies} />
    </div>
  );
};

export default Home;
