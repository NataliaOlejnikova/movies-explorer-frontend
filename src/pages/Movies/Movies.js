import { useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import SearchForm from '../../components/SearchForm/SearchForm';
import MoviesCardList from '../../components/MoviesCardList/MoviesCardList';
import Footer from '../../components/Footer/Footer';
import { moviesApiConfig } from '../../utils/constants';
import moviesApi from '../../utils/MoviesApi';
import filterMovies from '../../utils/filterMovies';

function Movies({ savedMovies, onAddMovie, onDeleteMovie }) {
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState(localStorage.getItem('searchQuery') || '');
  const [isShortMovie, setIsShortMovie] = useState(JSON.parse(localStorage.getItem('isShortMovie')) || false);
  const [movies, setMovies] = useState([]);

  const filteredMovies = JSON.parse(localStorage.getItem('filteredMovies'))
    || (searchQuery
      ? filterMovies(movies, searchQuery, isShortMovie)
      : []);

  const resultMovies = filteredMovies.map((movie) => {
    const saved = savedMovies.find(({ movieId }) => movie.movieId === movieId);
    return {
      ...movie,
      owner: saved ? saved.owner : null,
    };
  });

  function handleSearch(search, isShort) {
    if (search) {
      localStorage.setItem('searchQuery', search);
      localStorage.setItem('isShortMovie', JSON.stringify(isShort));
      localStorage.removeItem('filteredMovies');
      setSearchQuery(search);
      setIsShortMovie(isShort);
      if (movies.length === 0) {
        setIsLoading(true);
        moviesApi.getMovies()
          .then((result) => {
            setMovies(result.map(({
              id,
              created_at: _,
              updated_at: __,
              ...movie
            }) => ({
              ...movie,
              movieId: id,
              image: moviesApiConfig.baseUrl + movie.image.url,
              thumbnail: moviesApiConfig.baseUrl + movie.image.formats.thumbnail.url,
            })));
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            setIsLoading(false);
          });
      }
    }
  }

  useEffect(() => {
    if (movies.length) {
      localStorage.setItem('filteredMovies', JSON.stringify(filteredMovies));
    }
  }, [movies, searchQuery, isShortMovie]);

  return (
    <>
      <Header isLanding={false} />
      <main>
        <SearchForm
          searchQuery={searchQuery}
          isShortMovie={isShortMovie}
          onSearch={handleSearch}
          allowEmpty={false}
        />
        <MoviesCardList
          isLoading={isLoading}
          searchQuery={searchQuery}
          movies={resultMovies}
          onAddMovie={onAddMovie}
          onDeleteMovie={onDeleteMovie}
        />
      </main>
      <Footer />
    </>
  );
}

export default Movies;
