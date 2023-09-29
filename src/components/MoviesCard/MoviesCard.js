import { NavLink, useLocation } from "react-router-dom";
import './MoviesCard.css';
import { movieURL } from '../../utils/constants';

function MoviesCard({ movie, savedMovies, onMovieSave, onMovieDelete }) {
    const location = useLocation();
    const movieDuration = (min) => {
        const m = min % 60;
        const h = Math.floor(min / 60);
        const duration = `${h > 0 ? h + "ч" : ""} ${m > 0 ? m + "м" : ""}`;
        return duration.trim();
    };

    const isSaved = savedMovies.some(m => m.movieId === movie.id);

    function activeMovieSave() {
        if (!isSaved) {
            onMovieSave(
                {
                    country: movie.country,
                    director: movie.director,
                    duration: movie.duration,
                    year: movie.year,
                    description: movie.description,
                    image: `${movieURL}${movie.image.url}`,
                    trailerLink: movie.trailerLink,
                    thumbnail: `${movieURL}${movie.image.formats.thumbnail.url}`,
                    movieId: movie.id,
                    nameRU: movie.nameRU,
                    nameEN: movie.nameEN,
                }
            );
        } else if (isSaved) {
            onMovieDelete(movie);
        }
    }

    return (
        <div className='card'>
            <div className='card__header'>
                <div className='card__description'>
                    <h2 className='card__title'>{movie.nameRU}</h2>
                    <p className='card__duration'>{movieDuration(movie.duration)}</p>
                </div>
                {location.pathname === "/movies" &&
                    <button type="button"
                        className={`movie__button movie__button_type_save ${isSaved ? 'movie__button_type_save_active' : 'movie__button_type_save'}`}
                        onClick={activeMovieSave}>
                    </button>}
                {location.pathname === "/saved-movies" &&
                    <button type="button"
                        className="movie__button movie__button_type_delete"
                        onClick={() => onMovieDelete(movie)}>
                    </button>}
            </div>
            <NavLink to={movie.trailerLink.replace('https:', '')} target='_blank' className="movie__treiler">
                <img className='movie__thumbnail' alt="постер фильма" src={movie.image.url ? `${movieURL}${movie.image.url}` : movie.image} />
            </NavLink>
        </div>
    );
}

export default MoviesCard;