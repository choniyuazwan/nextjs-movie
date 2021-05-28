import { useState } from 'react';
import Router from 'next/router';
import {useDispatch} from 'react-redux';
import {clearMovies} from '../redux/actions/movieAction';
import {clearFilters} from '../redux/actions/filterAction';

const SearchBox = () => {
  const [value, setValue] = useState('');
  const dispatch = useDispatch();

  const handleChange = e => {
    setValue(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (value) {
      Router.push(`/search?searchkey=${value}&page=${1}`);
      dispatch(clearMovies());
      dispatch(clearFilters());
    } else {
      Router.push('/');
    };
  };

  const searchForm = () => (
    <form className='form-inline' onSubmit={handleSubmit}>
      <input className={'form-control'} type='text' value={value} onChange={handleChange} />
      <button className={'btn btn-primary'} data-testid='search-button'>Search</button>
    </form>
  );

  return (
    <div className='col d-flex justify-content-end'>
      {searchForm()}
    </div>
  );
};

export default SearchBox;
