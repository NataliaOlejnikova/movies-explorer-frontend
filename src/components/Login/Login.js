import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';
import Title from '../Title/Title';
import Field from '../ErrorInput/Field';
import Button from '../Button/Button';
import useFormValidation from '../../utils/useFormValidation';
import { EMAIL_PATTERN } from '../../utils/constants';
import './Login.css';

function Login({ isSubmitting, submittingError, onSubmit }) {
  const {
    values,
    errors,
    isValid,
    handleChange,
  } = useFormValidation();

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(values);
  }

  return (
    <main className="login">
      <section className="login__content">
        <Logo className="login__logo" />
        <Title className="login__title">Рады видеть!</Title>
        <form className="login__form" onSubmit={handleSubmit}>
          <Field
            label="E-mail"
            type="email"
            name="email"
            minLength="6"
            maxLength="30"
            pattern={EMAIL_PATTERN}
            required
            value={values.email || ''}
            error={errors.email}
            onChange={handleChange}
          />
          <Field
            label="Пароль"
            type="password"
            name="password"
            minLength="6"
            maxLength="30"
            required
            value={values.password || ''}
            error={errors.password}
            onChange={handleChange}
          />
          {submittingError && (
            <p className="login__error">{submittingError}</p>
          )}
          <Button
            type="submit"
            className="login__button"
            disabled={isSubmitting || !isValid}>
            {isSubmitting ? 'Вход...' : 'Войти'}
          </Button>
        </form>
        <p className="login__text">
          Ещё не зарегистрированы?
          {' '}
          <Link className="login__text-link" to="/signup">Регистрация</Link>
        </p>
      </section>
    </main>
  );
}

export default Login;
