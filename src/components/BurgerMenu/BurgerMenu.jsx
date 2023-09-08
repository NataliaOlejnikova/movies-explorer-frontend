import React from "react";
import { NavLink, Link } from "react-router-dom";
import "./BurgerMenu.css";
import { AccountButton } from '../AccountButton/AccountButton';

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
              <NavLink
                exact="true"
                to="/"
                className={({isActive}) => isActive ? 'burger-link_active' : 'burger-link'}
                >
                Главная
              </NavLink>
              </li>
              <li>
              <NavLink
                to="/movies"
                className={({isActive}) => isActive ? 'burger-link_active' : 'burger-link'}
                >
                Фильмы
              </NavLink>
              </li>
              <li>
              <NavLink
                to="/saved-movies"
                className={({isActive}) => isActive ? 'burger-link_active' : 'burger-link'}
              >
                Сохранённые фильмы
              </NavLink>
              </li>
            </ul>
            
          </nav>
          <AccountButton />
        </div>
       
      </div>
    </div>
  );
};

export default BurgerMenu;