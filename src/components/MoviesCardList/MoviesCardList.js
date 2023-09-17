import { useState, useEffect } from 'react';
import Preloader from '../Preloader/Preloader';
import MoviesCard from '../MoviesCard/MoviesCard';
import {
  MOBILE_MAX_WIDTH,
  TABLET_MAX_WIDTH,
  MOVIES_LIST_MOBILE,
  MOVIES_LIST_TABLET,
  MOVIES_LIST_DESKTOP,
} from '../../utils/constants';
import './MoviesCardList.css';

function MoviesCardList({
  movies,
  searchQuery,
  isLoading,
  onAddMovie,
  onDeleteMovie,
}) {
  const [pageWidth, setPageWidth] = useState(window.innerWidth);
  // eslint-disable-next-line no-nested-ternary
  const { start, step, count } = pageWidth < MOBILE_MAX_WIDTH
    ? MOVIES_LIST_MOBILE
    : pageWidth < TABLET_MAX_WIDTH ? MOVIES_LIST_TABLET : MOVIES_LIST_DESKTOP;
  const [currentPage, setCurrentPage] = useState(start);

  const hasMoreMovies = movies.length > currentPage * count;
  const visibleMovies = movies.slice(0, currentPage * count);

  function handleMoreClick() {
    setCurrentPage((prev) => prev + step);
  }

  useEffect(() => {
    let timer;
    let startTime = Date.now();
    function handleResize() {
      const currentTime = Date.now();
      clearTimeout(timer);
      if (currentTime - startTime >= 100) {
        setPageWidth(window.innerWidth);
        startTime = currentTime;
      } else {
        timer = setTimeout(() => {
          setPageWidth(window.innerWidth);
        }, 100);
      }
    }
    window.addEventListener('resize', handleResize, false);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize, false);
    };
  }, []);

  useEffect(() => {
    setCurrentPage(start);
  }, [start, movies.length]);

  return (
    <section className={`movies-card-list ${hasMoreMovies ? 'movies-card-list_infinite' : ''}`}>
      {isLoading && <Preloader />}
      {!isLoading && searchQuery && movies.length === 0 && (
        <p className="movies-card-list__text">Ничего не найдено</p>
      )}
      {!isLoading && movies.length > 0 && (
        <>
          <div className="movies-card-list__container">
            {visibleMovies.map((item) => (
              <MoviesCard
                key={item._id || item.movieId}
                {...item}
                onAddMovie={onAddMovie}
                onDeleteMovie={onDeleteMovie}
              />
            ))}
          </div>
          {hasMoreMovies && (
            <button
              type="button"
              className="movies-card-list__button"
              onClick={handleMoreClick}>
              Ещё
            </button>
          )}
        </>
      )}
    </section>
  );
}

export default MoviesCardList;
