import { Link } from "react-router-dom";
import "./Profile.css";
import { useState } from "react";

const Profile = () => {
  const [profileData, setProfileData] = useState({
    name: "Виталий",
    mail: "pochta@yandex.ru",
  });
  const [edit, setEdit] = useState(false);
  const handleEdit = () => setEdit(!edit);
  return (
    <section className="profile">
      <div className="profile__container">
        <form className="profile__form">
          <h1 className="profile__title">{`Привет, ${profileData.name}!`}</h1>
          <div className="profile__input-container profile__input-container_underline">
            <label className="profile__label" htmlFor="name">
              Имя
            </label>
            <input
              type="text"
              id="name"
              className="profile__input"
              value={profileData.name}
              onChange={(e) => {
                setProfileData((state) => ({ ...state, name: e.target.value }));
              }}
              disabled={!edit}
            />
          </div>
          <div className="profile__input-container">
            <label className="profile__label" htmlFor="email">
              E-mail
            </label>
            <input
              type="email"
              id="email"
              className="profile__input"
              value={profileData.mail}
              onChange={(e) => {
                setProfileData((state) => ({ ...state, mail: e.target.value }));
              }}
              disabled={!edit}
            />
          </div>
          {edit ? (
            <div className="profile__editContainer">
              <span className="profile__error">
                При обновлении профиля произошла ошибка.
              </span>
              <button type="submit" className="profile__save">
                Сохранить
              </button>
            </div>
          ) : (
            <div className="profile__edit">
              <button
                className="profile__link profile__link_submit"
                type="submit"
                onClick={handleEdit}
              >
                Редактировать
              </button>
              <Link
                className="profile__link profile__link_logout"
                to={"/signin"}
              >
                Выйти из аккаунта
              </Link>
            </div>
          )}
        </form>
      </div>
    </section>
  );
};

export default Profile;