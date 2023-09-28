import './Movies.css';
import { useState, useEffect } from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import MoreButton from '../MoreButton/MoreButton';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Preloader from '../Preloader/Preloader';
import { shortMoviesDuration } from '../../utils/constants';



function Movies({
    movies,
    savedMovies,
    loggedIn,
    onMovieSave,
    onMovieDelete,
}) {

    const [searchQuery, setSearchQuery] = useState(() => localStorage.getItem("searchQuery") || ""); // текст запроса
    const [searchResults, setSearchResults] = useState(JSON.parse(localStorage.getItem("searchResults")) || []); //результаты поиска
    const [searchResultsFiltered, setSearchResultsFiltered] = useState([]); // рез-ты поиска с учетом фильтрации по короткометражкам

    const [isLoading, setIsLoading] = useState(true);
    const [isSearchSuccess, setIsSearchSuccess] = useState(false);

    const [isChecked, setIsChecked] = useState(() => JSON.parse(localStorage.getItem("checkboxState")) || false);

    const [isNumberOfMoviesShown, setIsNumberOfMoviesShown] = useState(12);
    const [isNumberToAddMovies, setIsNumberToAddMovies] = useState(3);
    const [isMoreBtnShown, setIsMoreBtnShown] = useState(true);
    
    const handleSearchQueryChange = (event) => {
        const query = event.target.value;
        setSearchQuery(query);
        localStorage.setItem("searchQuery", query);
    };

    function handleSearch() {
        setIsLoading(true);
        setIsSearchSuccess(false);
        setTimeout(() => {
            const results = movies.filter((movie) =>
                movie.nameRU.toLowerCase().includes(searchQuery.toLowerCase()) || movie.nameEN.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setSearchResults(results);
            localStorage.setItem("searchResults", JSON.stringify(results));
            setIsSearchSuccess(results.length > 0);
            setIsLoading(false);
        }, 2000);
    }

    useEffect(() => {
        const results = movies.map(movie => {
            const foundIndex = savedMovies.findIndex(savedMovie => savedMovie.movieId === movie.id);

            if (foundIndex >= 0) {
                return {...movie, _id: savedMovies[foundIndex]._id}
            }

            return movie
        }).filter((movie) =>
          movie.nameRU.toLowerCase().includes(searchQuery.toLowerCase()) || movie.nameEN.toLowerCase().includes(searchQuery.toLowerCase())
        )
        setSearchResults(results);
        setIsSearchSuccess(results.length > 0);
        localStorage.setItem("searchResults", JSON.stringify(results));
        setIsLoading(false)
        setIsSearchSuccess(true)
    }, [movies])

    const handleChecked = () => {
        setIsChecked(!isChecked);
        localStorage.setItem("checkboxState", JSON.stringify(!isChecked));
    }

    useEffect(() => {
        if (isChecked) {
            setSearchResultsFiltered(searchResults.filter((movie) => movie.duration <= shortMoviesDuration));
        } else {
            setSearchResultsFiltered(searchResults);
        }
    }, [searchResults, isChecked]);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 805) {
                setIsNumberOfMoviesShown(12);
                setIsNumberToAddMovies(3);
            } else if (window.innerWidth > 450 && window.innerWidth <= 805) {
                setIsNumberOfMoviesShown(8);
                setIsNumberToAddMovies(2);
            } else if (window.innerWidth <= 450) {
                setIsNumberOfMoviesShown(5);
                setIsNumberToAddMovies(2);
            }
        };

        handleResize();

        setTimeout(() => {
            window.addEventListener('resize', handleResize);
        }, 2000);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleChangeMoreBtn = () => {
        if (searchResults.length > isNumberOfMoviesShown) {
            setIsMoreBtnShown(true);
        } else {
            setIsMoreBtnShown(false);
        }
    };

    const loadMore = () => {
        setIsNumberOfMoviesShown(isNumberOfMoviesShown + isNumberToAddMovies);
    };

    const displayedMovies = searchResultsFiltered.slice(0, isNumberOfMoviesShown);

    useEffect(() => {
        handleChangeMoreBtn();
    }, [loadMore, handleSearch]);

    return (
        <>
            <Header loggedIn={loggedIn} />
            <main className="movies">
                <SearchForm
                  onChange={handleSearchQueryChange}
                  searchQuery={searchQuery}
                  handleSearch={handleSearch}
                  isChecked={isChecked}
                  onCheckboxUpdated={handleChecked}
                />

                {isLoading ? <Preloader />
                    : isSearchSuccess && searchResultsFiltered.length ? (<div className="movies__content">
                        <MoviesCardList movies={displayedMovies} savedMovies={savedMovies} onMovieSave={onMovieSave} onMovieDelete={onMovieDelete} />
                        <MoreButton isShown={isMoreBtnShown} loadMore={loadMore} />  
                    </div>
                    ) : <p className="movies__message">Ничего не найдено</p>
                }
            </main>
            <Footer />
        </>
    )
}
export default Movies;