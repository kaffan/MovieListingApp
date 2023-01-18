import React, { useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [MovieList, setListState] = useState([]);
  const [ isLoading, setIsLoading ] = useState(false);
  const [Error, setError] = useState('');

  const fetchMoviesHandler = (e) =>{
    setIsLoading(true);
    fetch('https://swapi.dev/api/films')
    .then((obj)=>obj.json())
    .then((obj)=>obj.results)
    .then((obj)=>{
      console.log(obj);
      let newObj = [];
      obj.map((ele)=>newObj.push(ele));
      setListState([...newObj]); //here I created a new blank array and destructured 
      //newObj array because if i assign the newObj to state directly both newObj and state 
      // object will point to same object
      setIsLoading(false);
    })
    .catch((ele)=>{
      setIsLoading(false);
      setError('Something went wrong....');
    });
    console.log(MovieList);
  }
  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && MovieList.length > 0 && <MoviesList movies={MovieList}></ MoviesList> }
        {isLoading && !Error && <p>Loading....</p>}
        {!isLoading && Error && <p>{Error}</p> }
        {!isLoading && !Error && MovieList.length === 0 && <p>No movies found</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
