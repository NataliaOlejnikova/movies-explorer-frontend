import BaseApi from './BaseApi';
import { moviesApiConfig } from './constants';

class MoviesApi extends BaseApi {
  getMovies() {
    return this._fetch('/beatfilm-movies', {
      method: 'GET',
    });
  }
}

const moviesApi = new MoviesApi(moviesApiConfig);

export default moviesApi;
