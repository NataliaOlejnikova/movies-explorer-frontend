import "./Profile.css";
import { useState, useEffect, useContext, useRef } from "react";
import { Link } from "react-router-dom";
import Header from '../Header/Header';
import { useFormWithValidation } from "../../utils/validate";
import { CurrentUserContext } from "../../state/CurrentUserContext";

export function Profile({ loggedIn, onEditProfile, signOut, error }) {
  const currentUser = useContext(CurrentUserContext);
  const { values, handleChange, errors, isValid, resetForm } =
    useFormWithValidation(currentUser);
  const [isDisabledInput, setIsDisabledInput] = useState(false);
  const [isDisabledEditButton, setIsDisabledEditButton] = useState(true);
  const [isModifiedData, setIsModifiedData] = useState(false);
  const [isEditProfile, setIsEditProfile] = useState(false);

  const nameRef = useRef(null)
  const emailRef = useRef(null)

  useEffect(() => {
    resetForm({
      name: currentUser.data.name,
      email: currentUser.data.email
    });

    setIsDisabledEditButton(true)
    setIsDisabledInput(false);
  }, [currentUser, resetForm]);

  function handleEditButton() {
    setIsEditProfile(true)
    setIsDisabledInput(true);
  }

  useEffect(() => {
    setIsDisabledEditButton(!isValid)
  }, [isValid])

  function handleChangeInputValues(event) {
    let eventFromRef;

    switch (event.target.name) {
      case ('name'):
        eventFromRef = nameRef.current
        break
      case ('email'):
        eventFromRef = emailRef.current
        break
    }

    handleChange(eventFromRef)
  }

  useEffect(() => {
    setIsModifiedData(currentUser.name !== values.name || currentUser.email !== values.email);
  }, [currentUser.name, currentUser.email, values.name, values.email]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      setIsModifiedData(false);
      onEditProfile({ name: values.name, email: values.email })
        .then((err) => {
          if (!err) {
            setIsDisabledInput(true)
            setIsEditProfile(false)
          }
        })
        .finally(() => {
          setIsModifiedData(true)
        });
    }
  };

  return (
    <>
      <Header loggedIn={loggedIn} />
      <section className="main">
        <form className="profile" onSubmit={handleSubmit}>
          <h1 className="profile__title">Привет, {currentUser.data.name}</h1>
          <label className="profile__input-label">Имя
            <input
              ref={nameRef}
              type="text"
              className="profile__input"
              name="name"
              minLength="2"
              maxLength="40"
              value={values.name || ''}
              placeholder="Имя"
              onChange={handleChangeInputValues}
              pattern='^[a-zA-Zа-яА-я\-]*$'
              required
              disabled={isDisabledInput}
            />
          </label>
          <span className='profile__input-error'>{errors.name}</span>
          <label className="profile__input-label">E-mail
            <input
              ref={emailRef}
              type="email"
              className="profile__input"
              name="email"
              minLength="2"
              maxLength="30"
              value={values.email || ''}
              placeholder="Email"
              onChange={handleChangeInputValues}
              pattern="^[a-zA-Z0-9]([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+){1,}\.([a-zA-Z]+)$"
              required
              disabled={isDisabledInput}
            />
          </label>
          <span className='profile__input-error'>{errors.email}</span>
          <div className="profile__footer">
            {!isEditProfile ? (
              <>
                <div className="profile__footer-edit">
                  <button
                    type="button"
                    className="profile__edit"
                    onClick={handleEditButton}
                    disabled={isDisabledEditButton}
                  >
                    Редактировать
                  </button>
                  <Link className="profile__link" onClick={signOut} to="/">Выйти из аккаунта</Link>
                </div>
              </>
            ) : (
              <>
                <div className="profile__footer-save">
                  <span className={`profile__err-text ${!isValid ? "profile__err-text_active" : "profile__err-text"}`}>
                    {error}
                  </span>
                  <button
                    type="submit"
                    className="profile__save-btn"
                    onSubmit={handleSubmit}
                    disabled={!isModifiedData}
                  >
                    Сохранить
                  </button>
                </div>
              </>
            )}
          </div>
        </form>
      </section>
    </>
  );
}
export default Profile;