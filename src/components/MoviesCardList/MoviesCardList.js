import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';


function MoviesCardList({ movies, savedMovie, onMovieSave, onMovieDelete }) {
    return (
        <section className='cards'>
            <div className='cards__container'>
                {movies.map((movie) =>
                    <MoviesCard key={movie.id || movie._id} movie={movie} savedMovie={savedMovie} onMovieSave={onMovieSave} onMovieDelete={onMovieDelete} />)}
            </div>
           
        </section>
    );
}

export default MoviesCardList;