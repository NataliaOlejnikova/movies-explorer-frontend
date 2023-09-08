import "./SearchForm.css";

export const SearchForm = () => {
    return (
        <section className="search-form">
            <form className="search-form__form">
                <div className="search-form__bar">
                    <div className="search-form__icon"></div>
                    <input
                        name="text"
                        className="search-form__input"
                        type="text"
                        placeholder="Фильм"
                        required
                    ></input>
                    <button type="submit" className="search-form__button" aria-label="Искать"></button>
                </div>
                <div className="search-form__checkbox">
                    <label className="search-form__switch">
                        <input
                            id="toggle-checkbox"
                            className="search-form__checkbox-toggle"
                            type="checkbox"
                        />
                        <span className="search-form__checkbox-slider" />
                    </label>
                    <label htmlFor="checkbox-mobile" className="search-form__shorts">Короткометражки</label>
                </div>
            </form>
        </section>
    );
}
export default SearchForm;