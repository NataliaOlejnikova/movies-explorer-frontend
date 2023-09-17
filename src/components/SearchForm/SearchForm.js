import { useRef, useState } from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import './SearchForm.css';

function SearchForm({
  searchQuery,
  isShortMovie,
  onSearch,
  allowEmpty,
}) {
  const input = useRef();
  const [isEmpty, setIsEmpty] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (!allowEmpty) {
      setIsEmpty(!input.current.value);
    }
    onSearch(input.current.value, isShortMovie);
  }

  function handleChange() {
    if (!allowEmpty) {
      setIsEmpty(!input.current.value);
    }
  }

  function handleChangeIsShort(isShort) {
    onSearch(input.current.value, isShort);
  }

  return (
    <section>
      <form className="search-form" onSubmit={handleSubmit}>
        <div className="search-form__field">
          <input
            ref={input}
            type="text"
            name="searchQuery"
            className={`search-form__input ${isEmpty ? 'search-form__input_error' : ''}`}
            placeholder="Фильм"
            defaultValue={searchQuery || ''}
            onChange={handleChange}
          />
          <button
            className="search-form__button"
            type="submit"
            aria-label="Искать"
          />
        </div>
        {isEmpty && (
          <div className="search-form__error">Нужно ввести ключевое слово</div>
        )}
        <div className="search-form__checkbox-container">
          <FilterCheckbox value={isShortMovie} onChange={handleChangeIsShort} />
        </div>
      </form>
    </section>
  );
}

export default SearchForm;
