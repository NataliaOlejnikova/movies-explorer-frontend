import './Field.css';

function Field({ label, error, ...rest }) {
  return (
    <label className="field">
      <span className="field__text">{label}</span>
      <input className={`field__input ${error ? 'field__input_error' : ''}`} {...rest} />
      {error && (
        <span className="field__error">{error}</span>
      )}
    </label>
  );
}

export default Field;
