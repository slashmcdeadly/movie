import {useState, useEffect} from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import DelayComponent from './DelayComponent';

function MovieInfo(props) {

    const [error, setError] = useState(undefined);
    const [jokeText, setJokeText] = useState('');
    const [posted, setPosted] = useState(false);

    // const match = useRouteMatch();
    const history = useHistory();

    async function handleSubmit(e) {

        const movie = props.title;
        const year = props.year;
        const imdb = props.imdb;
        const poster = props.poster;

        try {
            // console.log(match.params.id);
            const url =  '/api/movies';
            const method =  'POST';
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ movie: movie, year: year, imdb: imdb, poster: poster }),
            });
            const data = await response.json();
            console.log('success');
            if (!response.ok) {
                throw new Error(data.message);
            }
            
            history.push('/');
            
        } catch (err) {
            setError(err.message);
        }
    };

    async function addJoke(e) {

        e.preventDefault();

        const movie = props.title;
        const year = props.year;
        const imdb = props.imdb;
        const joke = jokeText;

        try {
            // console.log(match.params.id);
            const url =  '/api/jokes';
            const method =  'POST';
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ movie: movie, year: year, imdb: imdb, joke: joke }),
            });
            const data = await response.json();
            console.log('success');
            if (!response.ok) {
                throw new Error(data.message);
            }
            
            history.push('/');
            setJokeText('');
            setPosted(true);
            
        } catch (err) {
            setError(err.message);
        }
    };

    const handleChange = (e) => {
        setJokeText(e.target.value);
    }

   return (
       <div className="movieInfo">
           {
               props.movieInfo.Poster !== "N/A" ?
               <img src={props.movieInfo.Poster} alt="movie poster"/>:null
           }
           <h3>{props.movieInfo.Title} ({props.movieInfo.Year})</h3>
           <h4>Directed by: {props.movieInfo.Director}</h4>
           <h4>Written by: {props.movieInfo.Writer}</h4>
           <h4>Staring: {props.movieInfo.Actors}</h4>
           <p>Plot: {props.movieInfo.Plot}</p>
           {
                props.movieInfo.Ratings[0] ?
                <h4>imdb: {props.movieInfo.Ratings[0].Value}</h4>:null
           }
           {
                props.movieInfo.Ratings[1] ?
                <h4>rotten tomatoes: {props.movieInfo.Ratings[1].Value}</h4>:null
           }
           {
                props.movieInfo.Ratings[2] ?
                <h4>metacritic: {props.movieInfo.Ratings[2].Value}</h4>:null
           }
           <button onClick={handleSubmit}>Add Movie</button>

           <form className="jokeForm">
               <textarea value={jokeText} onChange={handleChange} name="jokeField" id="jokeField" cols="30" rows="10"></textarea>

               <button onClick={addJoke} className="jokeButton">Save Joke</button>
               {    posted ?
                   <DelayComponent />:null
               }
               
           </form>
       </div>
   ) 
}

export default MovieInfo;