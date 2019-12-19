import { combineReducers } from 'redux';
import favorites from './favorites';
import movie from './movie';
import page from './page';
import results from './results';
import search from './search';

export default combineReducers({
  favorites, movie, page, results, search,
});
