import { useNavigate } from 'react-router-dom';
import './Error.css';

function Error() {
  const navigate = useNavigate();

  function handleClick() {
    navigate(-1);
  }

  return (
    <main>
      <section className="error">
        <h1 className="error__title">404</h1>
        <p className="error__message">Страница не найдена</p>
        <button type="button" className="error__link" onClick={handleClick}>
          Назад
        </button>
      </section>
    </main>
  );
}

export default Error;
