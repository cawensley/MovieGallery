import { combineReducers } from 'redux';
import favorites from './favorites';
import page from './page';
import results from './results';
import search from './search';

export default combineReducers({
  favorites, page, results, search,
});
