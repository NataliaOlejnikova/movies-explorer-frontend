import { useContext } from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import './MoviesCard.css';

function MoviesCard({
  onAddMovie,
  onDeleteMovie,
  owner,
  ...movie
}) {
  const currentUser = useContext(CurrentUserContext);
  const isSaved = owner === currentUser._id;
  const duration = `${Math.floor(movie.duration / 60)}ч ${movie.duration % 60}м`;

  function handleAddMovie(e) {
    e.preventDefault();
    onAddMovie(movie);
  }

  function handleDeleteMovie(e) {
    e.preventDefault();
    onDeleteMovie(movie);
  }

  return (
    <section className="movies-card">
      <a className="movies-card__link" href={movie.trailerLink} target="_blank" rel="noreferrer">
        <figure className="movies-card__image-container">
          <figcaption className="movies-card__caption">
            <div className="movies-card__text">
              <h2 className="movies-card__title">{movie.nameRU}</h2>
              <p className="movies-card__duration">{duration}</p>
            </div>
            {onAddMovie && (
              <button
                type="button"
                className={`movies-card__save ${isSaved ? 'movies-card__save_active' : ''}`}
                onClick={isSaved ? handleDeleteMovie : handleAddMovie}
              />
            )}
            {!onAddMovie && isSaved && (
              <button
                type="button"
                className="movies-card__delete"
                onClick={handleDeleteMovie}
              />
            )}
          </figcaption>
          <img src={movie.image} alt={movie.nameRU} className="movies-card__image" />
        </figure>
      </a>
    </section>
  );
}

export default MoviesCard;
