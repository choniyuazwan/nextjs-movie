import MovieList from './MovieList';
import React from 'react';
import Router from 'next/router';
import {useSelector} from 'react-redux';
import {getFilteredMovies} from '../redux/selectors/moviesSelector';

export default function MovieSlider (props) {
  const filteredMovies = useSelector(getFilteredMovies);

  return (
    props.filter ?
      <div className='row'>
        {filteredMovies !== undefined && filteredMovies.map((movie, index) => (
          <div className='image-container d-flex justify-content-start m-3' id={index} key={index}
            onClick={() => Router.push( `/detail?id=${movie.id}`)}>
            <img className='rounded' src={props.urlImage + movie.poster_path} alt='movie'/>
            <MovieList movie={movie}/>
          </div>
        ))}
      </div>
      :
      <div className='row'>
        {props.data !== undefined && props.data.map((movie, index) => (
          <div className='image-container d-flex justify-content-start m-3' id={index} key={index}
            onClick={() => Router.push( `/detail?id=${movie.id}`)}>
            <img className='rounded' src={props.urlImage + movie.poster_path} alt='movie'/>
            <MovieList movie={movie}/>
          </div>
        ))}
      </div>
  );
}
