import { useState, useContext, useEffect } from 'react';
import Title from '../Title/Title';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import useFormValidation from '../../utils/useFormValidation';
import { NAME_PATTERN, EMAIL_PATTERN } from '../../utils/constants';
import './ProfileInfo.css';

function ProfileInfo({
  isSubmitting,
  submittingError,
  onSubmit,
  onSignOut,
}) {
  const [isEdit, setIsEdit] = useState(false);
  const [isProfileChanged, setIsProfileChanged] = useState(false);
  const currentUser = useContext(CurrentUserContext);

  const {
    values,
    errors,
    isValid,
    handleChange,
    setIsValid,
  } = useFormValidation(currentUser);

  function handleEditClick() {
    setIsEdit(true);
    setIsProfileChanged(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(values);
  }

  function handleSignOut(e) {
    e.preventDefault();
    onSignOut();
  }

  useEffect(() => {
    if (isEdit) {
      setIsEdit(false);
      setIsProfileChanged(true);
    }
  }, [currentUser]);

  useEffect(() => {
    if (values.name === currentUser.name && values.email === currentUser.email) {
      setIsValid(false);
    }
  }, [values.name, values.email]);

  return (
    <main>
      <section className="profile-info">
        <Title className="profile-info__title">Привет, {currentUser.name}!</Title>
        <form className="profile-info__form" onSubmit={handleSubmit}>
          <label className="profile-info__field">
            <span className="profile-info__text">Имя</span>
            <input
              className={`profile-info__input ${isEdit ? 'profile-info__input_active' : ''} ${errors.name ? 'profile-info__input_error' : ''}`}
              type="text"
              name="name"
              value={values.name || ''}
              placeholder=""
              minLength="2"
              maxLength="30"
              pattern={NAME_PATTERN}
              required
              readOnly={!isEdit}
              onChange={handleChange}
            />
            {errors.name && (
              <span className="profile-info__field-error">{errors.name}</span>
            )}
          </label>
          <label className="profile-info__field">
            <span className="profile-info__text">E-mail</span>
            <input
              className={`profile-info__input ${isEdit ? 'profile-info__input_active' : ''} ${errors.email ? 'profile-info__input_error' : ''}`}
              type="email"
              name="email"
              value={values.email || ''}
              placeholder=""
              minLength="2"
              maxLength="30"
              pattern={EMAIL_PATTERN}
              required
              readOnly={!isEdit}
              onChange={handleChange}
            />
            {errors.email && (
              <span className="profile-info__field-error">{errors.email}</span>
            )}
          </label>
          {submittingError && (
            <p className="profile-info__message profile-info__message_type_error">{submittingError}</p>
          )}
          {isProfileChanged && (
            <p className="profile-info__message profile-info__message_type_success">
              Профиль успешно обновлен
            </p>
          )}
          <div className="profile-info__links">
            {isEdit && (
              <button
                className="profile-info__button"
                type="submit"
                disabled={isSubmitting || !isValid}>
                {isSubmitting ? 'Сохранение...' : 'Сохранить'}
              </button>
            )}
            {!isEdit && (
              <button
                className="profile-info__button"
                type="button"
                onClick={handleEditClick}>
                Редактировать
              </button>
            )}
            <a
              className="profile-info__link"
              href="#"
              onClick={handleSignOut}>
              Выйти из аккаунта
            </a>
          </div>
        </form>
      </section>
    </main>
  );
}

export default ProfileInfo;
