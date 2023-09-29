import './Register.css';
import { Link } from "react-router-dom";
import { useFormWithValidation } from '../../utils/validate';
import { useEffect, useRef } from 'react';

export function Register({ handleRegister, error, setError }) {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormWithValidation();

  const nameRef = useRef(null)
  const emailRef = useRef(null)
  const passwordRef = useRef(null)

  if (window.history.length <= 2) {
    window.location.href = '/'
  }

  function handleChangeInputValues(event) {
    let eventFromRef;

    switch (event.target.name) {
      case ('name'):
        eventFromRef = nameRef.current
        break
      case ('email'):
        eventFromRef = emailRef.current
        break
      case ('password'):
        eventFromRef = passwordRef.current
        break
    }

    handleChange(eventFromRef)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      handleRegister(values.name, values.email, values.password);
      resetForm({
        name: '',
        email: '',
        password: '',
      });
    } catch (e) {
      console.error(e)
    }
  };

  useEffect(() => setError(""), []);

  return (
    <section className="main">
      <form className="form-welcome" onSubmit={handleSubmit}>
        <Link to="/" className="form-welcome__logo"></Link>
        <h1 className="form-welcome__title">Добро пожаловать!</h1>
        <label className="form-welcome__input-label">Имя</label>
        <input
          ref={nameRef}
          type="text"
          className="form-welcome__input form-welcome__input_type_name"
          name="name"
          minLength="2"
          maxLength="40"
          placeholder='Имя'
          pattern='^[a-zA-Zа-яА-я\-]*$'
          value={values.name}
          onChange={handleChangeInputValues}
          required
        />
        <span className='form-welcome__input-error'>{errors.name}</span>
        <label className="form-welcome__input-label">E-mail</label>
        <input
          ref={emailRef}
          type="email"
          className="form-welcome__input form-welcome__input_type_email"
          name="email"
          minLength="2"
          maxLength="30"
          placeholder="Email"
          pattern="^[a-zA-Z0-9]([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+){1,}\.([a-zA-Z]+)$"
          value={values.email}
          onChange={handleChangeInputValues}
          required
        />
        <span className='form-welcome__input-error'>{errors.email}</span>
        <label className="form-welcome__input-label">Пароль</label>
        <input
          ref={passwordRef}
          type="password"
          className="form-welcome__input form-welcome__input_type_password"
          name="password"
          minLength="8"
          maxLength="30"
          placeholder="Пароль"
          value={values.password}
          onChange={handleChangeInputValues}
          required
        />
        <span className='form-welcome__input-error form-welcome__input-error_type_password'>{errors.password}</span>
        <p className="form-welcome__err-text">{error}</p>
        <button
          type="submit"
          className="form-welcome__button"
          disabled={handleRegister || !isValid}>
          Зарегистрироваться
        </button>
        <p className="form-welcome__link-text">Уже зарегистрированы? <Link className="form-welcome__link" to="/signin">Войти</Link></p>
      </form>
    </section>
  );
}
export default Register;