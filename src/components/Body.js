import axios from 'axios';
import { useState } from 'react';
import MovieInfo from './MovieInfo';

function Body(){

    const [movieSearchTerm, setMovieSearchTerm] = useState(""); 
    const [movieSearchResults, setMovieSearchResults] = useState({});
    const [movieInfo, setMovieInfo] = useState({});
    const [movieInfoShowing, setMovieInfoShowing] = useState(false);

    function searchMovies(e) {
        const apiKey = '13cf90c';
        axios({
            url: `http://www.omdbapi.com/?apikey=${apiKey}&s=${movieSearchTerm}`,
            method: "GET",
            dataResponse: "json",
            }).then((response) => {
                const data = response.data["Search"];
                if (data) {
                    setMovieSearchResults(data);
                } else {
                    setMovieSearchResults({});
                }
                // console.log(data)
            });
        
    }

    const handleChange = (e) => {
        setMovieSearchTerm(e.target.value);
    }

    const handleClick = (e) => {
            searchMovies();
            console.log('submitted')
    }

    const handleMovie = (e) => {
        console.log(e.target.value);
        const apiKey = '13cf90c';
        axios({
            url: `http://www.omdbapi.com/?apikey=${apiKey}&i=${e.target.value}`,
            method: "GET",
            dataResponse: "json",
            }).then((response) => {
                const data = response.data;
                setMovieInfo(data);
                setMovieInfoShowing(true);
            });
    }

    return (
        <div>
            <input type="text" onChange={handleChange} />
            <button onClick={handleClick}>Submit</button>

            <div>
                {   movieSearchResults.length > 0 ?
                    movieSearchResults.map((movie)=> {
                        return <button key={movie.imdbID} value={movie.imdbID} onClick={handleMovie}>{movie.Title}</button>
                    }):null
                }
            </div>
            {
                movieInfoShowing ?
                <MovieInfo movieInfo={movieInfo} title={movieInfo.Title} year={movieInfo.Year} poster={movieInfo.Poster} imdb={movieInfo.imdbID} />:null
            }
        </div>
    )
}

export default Body;