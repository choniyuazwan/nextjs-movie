import React from 'react';
import {Form} from 'react-bootstrap';
import MovieListHeading from './MovieListHeading';
import SearchBox from './SearchBox';
import MovieSlider from './MovieSlider';
import {getAllMovies} from '../redux/selectors/moviesSelector';
import {useSelector, useDispatch} from 'react-redux';
import {setCheckboxFilter, removeCheckboxFilter} from '../redux/actions/filterAction';

export default function MovieBox(props) {
  const releaseDate = [...new Set(props.data.map((movie => movie.release_date && movie.release_date.substring(0, 4))))].sort((a, b) => b - a);

  const movies = useSelector(getAllMovies);
  const dispatch = useDispatch();

  const handleFilterReleaseDate = (e) => {
    const value = e.target.value;

    if (e.target.checked) {
      dispatch(setCheckboxFilter(value));
    } else {
      dispatch(removeCheckboxFilter(value));
    }
  };

  const releaseDatesItemsCount = {};
  movies.forEach(movie => {
    releaseDatesItemsCount[movie.release_date] = releaseDatesItemsCount[movie.release_date] + 1 || 1;
  });

  return (
    <>
      <div className='row d-flex align-items-center mt-4 mb-4'>
        <MovieListHeading heading={props.headingTitle}/>
        {props.searchFeature ? <SearchBox /> : null}
      </div>
      {props.filter ?
        <div className='row'>
          <div className='col col-sm-10 col-md-10 col-lg-10 col-xl-11'>
            <MovieSlider data={props.data} urlImage={props.urlImage} filter={props.filter} />
          </div>
          <div className='col col-sm-2 col-md-2 col-lg-2 col-xl-1'>
            <Form>
              <div className='mb-3'>
                <label>Release Date :</label>
                {releaseDate.map((date, index) => {
                  return (
                    date &&
                    <div className='row' key={index}>
                      <Form.Check inline label={date} name={date} type='checkbox' id={date} value={date} onChange={(e) => handleFilterReleaseDate(e)}/>
                      <label>({releaseDatesItemsCount[date]})</label>
                    </div>
                  );
                })}
              </div>
            </Form>
          </div>
        </div>
        :
        <MovieSlider data={props.data} urlImage={props.urlImage} />
      }
    </>
  );
}
