import React from "react";
import { NavLink, Link } from "react-router-dom";
import "./BurgerMenu.css";
import account from './../../images/icon__COLOR_icon-main.svg';
import "../Navigation/Navigation";

const BurgerMenu = ({ onClose }) => {
  return (
    <div className="burger">
      <div className="burger__backdrop">
        <div className="burger__container">
          <button
            type="button"
            className="burger__close-btn"
            onClick={() => onClose()}
          />
          <nav>
            <ul className="burger__menu">
              <li>
                <a className="burger-link" href="/" >
                  Главная
                </a>
              </li>
              <li>
                <a ClassName="burger-link" href="/movies" >
                  Фильмы
                </a>
              </li>
              <li>
                <a className="burger-link" href="/saved-movies">
                  Сохранённые фильмы
                </a>
              </li>
            </ul>
          </nav>
          <Link to="/profile">
            <button className="burger__button_account" type='button'>Аккаунт</button>
            <img className={"navtab__account-logo"} alt={'Аккаунт'} src={account} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BurgerMenu;
