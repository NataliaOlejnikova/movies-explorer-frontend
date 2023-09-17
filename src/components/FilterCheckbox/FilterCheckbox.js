import './FilterCheckbox.css';

function FilterCheckbox({ value, onChange }) {
  function handleChange(e) {
    onChange(e.target.checked);
  }

  return (
      <label className="filter-checkbox">
        <input
          className="filter-checkbox__input"
          type="checkbox"
          checked={value}
          onChange={handleChange}
        />
        <span className="filter-checkbox__toggle" />
        <span className="filter-checkbox__label">Короткометражки</span>
      </label>
  );
}

export default FilterCheckbox;
