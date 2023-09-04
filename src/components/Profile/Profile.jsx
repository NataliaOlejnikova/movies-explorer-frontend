import "./Profile.css";
import { Link } from "react-router-dom";

const Profile = () => {
  return (
    <>
      <section className="profile">
        <h1 className="profile__title">Привет, Виталий</h1>
        <form className="profile__form form">
          <div className="profile__value">
            <label className="profile__label">Имя</label>
            <input
              type="text"
              name="name"
              className="profile__input"
              minLength={2}
              maxLength={40}
              placeholder="Имя"
              required
            />
          </div>
          <div className="profile__line"></div>
          <div className="profile__value">
            <label className="profile__label">E-mail</label>
            <input
              type="email"
              name="email"
              className="profile__input"
              placeholder="email"
              required
            />
          </div>
          <div className="profile__bottom">
            <button type="button" className="profile__edit">
              Редактировать
            </button>
            <Link className="profile__logout" to="/">
              Выйти из аккаунта
            </Link>
          </div>
        </form>
      </section>
    </>
  );
};

export default Profile;
