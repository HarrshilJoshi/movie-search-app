import React, { useEffect, useState } from 'react';
import Search from './components/Search.jsx';
import Spinner from './components/spinner.jsx';
import MovieCard from './components/MovieCard.jsx';
// import {useDebouce} from 'react-use'
import { useDebounce } from 'react-use';
// import { updateSearchCount } from './appwrite.js';
import { getTrendingMovies, updateSearchCount } from './appwrite.js'


const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMBD_API_KEY;

const API_OPTION = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
};

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [debounceSearchTerm, setdebounceSearchTerm] = useState('')
  const [trendingMovies, setTrendingMovies] = useState([]);

  // debounce search term to prevent making too easy api request;
  useDebounce(() => {
  setdebounceSearchTerm(searchTerm);
}, 1000, [searchTerm]);


  const fetchMovies = async (query='') => {
    setIsLoading(true);
    setErrorMessage('');

    try {
      const endpoint = query 
      ?`${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
      :`${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      const response = await fetch(endpoint, API_OPTION);

      if (!response.ok) {
        throw new Error('Error fetching movies');
      }

      const data = await response.json();
      if(data.Response==='False'){
        setErrorMessage(data.Error || 'Failed to fetch movies');
      setMovieList([]);
      return;
      }
      setMovieList(data.results || []);

      
    } catch (error) {
      console.error(`Error fetching movies: ${error}`);
      setErrorMessage('Error fetching movies. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  
  const loadTrendingMovies = async () => {
    try {
      const movies = await getTrendingMovies();

      setTrendingMovies(movies);
    } catch (error) {
      console.error(`Error fetching trending movies: ${error}`);
    }
  }





  useEffect(() => {
    fetchMovies(debounceSearchTerm);
  }, [debounceSearchTerm]);


  
  
  useEffect(() => {
    loadTrendingMovies();
  }, []);

  return (
    <main>
      <div className="pattern" />

      <div className="wrapper">
        <header>
          <img src="/hero.png" alt="Hero Banner" />
          <h1>
            Find <span className="text-gradient">Movies</span> You'll Enjoy without the Hassle
          </h1>
          <Search searchTerm={searchTerm} setsearchTerm={setSearchTerm} />
        </header>
        {trendingMovies.length>0 && (
          <section className="trending">
            <h2>Trending Movies</h2>

            <ul>
              {trendingMovies.map((movie,index)=>(
                <li key={movie.$id}>
                  <p>{index+1}</p>
                  <img src={movie.poster_url} alt={movie.title} />
                </li>
              ))}
            </ul>

          </section>
        )}
        <section className="all-movies">
          <h2>ALL Movies</h2>
          {/* {errorMessage && <p className="error">{errorMessage}</p>} */}
          {isLoading ? (
           <Spinner/>
          ) : errorMessage? (
            <p className="text-red-500">{errorMessage}</p>
          ):(
            <ul>
  {movieList.map((movie) => (
   <MovieCard
  key={movie.id}
  movie={movie}
  onClick={() => {
    console.log("Clicked:", movie.title);
    updateSearchCount( movie); // ✅ Only on click
  }}
/>

  ))}
</ul>

          )}
        </section>
      </div>
    </main>
  );
};

export default App;
