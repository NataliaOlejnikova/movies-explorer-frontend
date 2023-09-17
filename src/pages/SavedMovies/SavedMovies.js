import { useState } from 'react';
import Header from '../../components/Header/Header';
import SearchForm from '../../components/SearchForm/SearchForm';
import MoviesCardList from '../../components/MoviesCardList/MoviesCardList';
import Footer from '../../components/Footer/Footer';
import filterMovies from '../../utils/filterMovies';

function SavedMovies({ savedMovies, onDeleteMovie }) {
  const [isShortMovie, setIsShortMovie] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMovies = filterMovies(savedMovies, searchQuery, isShortMovie);

  function handleSearch(search, isShort) {
    setSearchQuery(search);
    setIsShortMovie(isShort);
  }

  return (
    <>
      <Header isLanding={false} />
      <main>
        <SearchForm
          searchQuery={searchQuery}
          isShortMovie={isShortMovie}
          onSearch={handleSearch}
          allowEmpty
        />
        <MoviesCardList
          searchQuery={searchQuery}
          movies={filteredMovies}
          onDeleteMovie={onDeleteMovie}
        />
      </main>
      <Footer />
    </>
  );
}

export default SavedMovies;
