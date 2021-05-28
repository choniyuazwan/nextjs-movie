import { combineReducers } from 'redux';
import moviesReducer from './moviesReducer';
import filtersReducer from './filtersReducer';

export default combineReducers({ moviesReducer, filtersReducer });
