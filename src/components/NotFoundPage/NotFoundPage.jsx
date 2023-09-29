import { Link, useNavigate } from "react-router-dom";
import "./NotFoundPage.css";

const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <main className="error">
      <div className="error__container">
        <h1 className="error__title">404</h1>
        <p className="error__subtitle">Страница не найдена</p>
      </div>
      <Link className="error__link" onClick={() => navigate(-1)}>
        Назад
      </Link>
    </main>
  );
};

export default NotFoundPage;