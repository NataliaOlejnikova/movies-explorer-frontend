import { useState, useEffect, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import Logo from '../Logo/Logo';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import './Header.css';

const getNavLinkClassName = ({ isActive }) => `header__nav-link ${isActive ? 'header__nav-link_active' : ''}`;

function Header({ isLanding }) {
  const [isOpened, setIsOpened] = useState(false);
  const currentUser = useContext(CurrentUserContext);

  const isAuthorizedHeader = currentUser || !isLanding;

  const onBurgerClick = () => {
    setIsOpened(!isOpened);
  };

  useEffect(() => {
    document.body.style.overflow = !isOpened ? 'auto' : 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpened]);

  return (
    <header className={`header ${!isAuthorizedHeader ? 'header_landing' : ''}`}>
      <Logo />
      {!isAuthorizedHeader && (
        <nav className="header__nav">
          <ul className="header__nav-links header__nav-links_type_auth">
            <li>
              <NavLink
                className="header__nav-link"
                to="/signup"
              >
                Регистрация
              </NavLink>
            </li>
            <li>
              <NavLink
                className="header__nav-link header__nav-link_type_button"
                to="/signin"
              >
                Войти
              </NavLink>
            </li>
          </ul>
        </nav>
      )}
      {isAuthorizedHeader && (
        <>
          <nav className={`header__nav header__nav_overlay ${isOpened ? 'header__nav_opened' : ''}`}>
            <ul className="header__nav-links header__nav-links_type_site">
              <li className="header__mobile-link">
                <NavLink
                  className={getNavLinkClassName}
                  to="/"
                >
                  Главная
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={getNavLinkClassName}
                  to="/movies"
                >
                  Фильмы
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={getNavLinkClassName}
                  to="/saved-movies"
                >
                  Сохраненные фильмы
                </NavLink>
              </li>
            </ul>
            <ul className="header__nav-links header__nav-links_type_account">
              <li>
                  <NavLink
                    className="header__nav-link header__nav-link_type_account"
                    to="/profile"
                  >
                    Аккаунт
                  </NavLink>
                </li>
            </ul>
          </nav>
          <button
            type="button"
            className={`header__burger ${isOpened ? 'header__burger_opened' : ''}`}
            onClick={onBurgerClick}
          />
        </>
      )}
    </header>
  );
}

export default Header;
