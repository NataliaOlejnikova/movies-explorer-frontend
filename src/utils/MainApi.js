import BaseApi from './BaseApi';
import { mainApiConfig } from './constants';

class MainApi extends BaseApi {
  getMovies() {
    return this._fetch('/movies', {
      method: 'GET',
    });
  }

  addMovie(movie) {
    return this._fetch('/movies', {
      method: 'POST',
      body: JSON.stringify(movie),
    });
  }

  deleteMovie(movieId) {
    return this._fetch(`/movies/${movieId}`, {
      method: 'DELETE',
    });
  }

  getUser() {
    return this._fetch('/users/me', {
      method: 'GET',
    });
  }

  updateUser({ name, email }) {
    return this._fetch('/users/me', {
      method: 'PATCH',
      body: JSON.stringify({ name, email }),
    });
  }

  signUp({ email, password, name }) {
    return this._fetch('/signup', {
      method: 'POST',
      body: JSON.stringify({ email, password, name }),
    });
  }

  signIn({ email, password }) {
    return this._fetch('/signin', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  signOut() {
    return this._fetch('/signout', {
      method: 'POST',
    });
  }
}

const mainApi = new MainApi(mainApiConfig);

export default mainApi;
