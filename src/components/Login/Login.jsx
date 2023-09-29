import "./Login.css";
import { Link } from "react-router-dom";
import { useFormWithValidation } from '../../utils/validate';
import { useEffect, useRef } from 'react';
import logo from "../../images/header-logo.svg";

export function Login({ handleLogin, error, setError }) {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormWithValidation();

  const emailRef = useRef(null)
  const passwordRef = useRef(null)

  if (window.history.length <= 2) {
    window.location.href = '/'
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      handleLogin(values.email, values.password);
      resetForm({
        email: '',
        password: '',
      });
    } catch (e) {
      console.error(e)
    }
  };

  function handleChangeInputValues(event) {
    let eventFromRef;

    switch (event.target.name) {
      case ('email'):
        eventFromRef = emailRef.current
        break
      case ('password'):
        eventFromRef = passwordRef.current
        break
    }

    handleChange(eventFromRef)
  }

  useEffect(() => setError(""), []);

  return (
    <section className="login">
      <div className="login__header">
        <a href="/">
          <img src={logo} alt="Логотип" className="login__logo" />
        </a>
        <h1 className="login__title">Рады видеть!</h1>
      </div>
      <form className="login__form form" onSubmit={handleSubmit}>
        <label className="login__label">E-mail</label>
        <input
          ref={emailRef}
          type="email"
          className="login__input login__input_type_email"
          name="email"
          minLength="2"
          maxLength="30"
          placeholder="Email"
          pattern="^[a-zA-Z0-9]([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+){1,}\.([a-zA-Z]+)$"
          onChange={handleChangeInputValues}
          required
        />
        <span className='login__error'>{errors.email}</span>
        <label className="login__label">Пароль</label>
        <input
          ref={passwordRef}
          type="password"
          className="login__input login__input_type_password"
          name="password"
          minLength="8"
          maxLength="30"
          placeholder="Пароль"
          onChange={handleChangeInputValues}
          required
        />
        <span className='login__error'>{errors.password}</span>
        <p className="login__err-text">{error}</p>
        <button
          type="submit"
          className="login__button"
          disabled={!isValid}>
          Войти
        </button>
      </form>
      <p className="login__link-text">Ещё не зарегистрированы?
        <Link className="login__link" to="/signup">Регистрация</Link>
      </p>
    </section>
  );
}
export default Login;