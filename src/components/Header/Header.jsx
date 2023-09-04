import React from 'react';
import { Link } from 'react-router-dom';
import Navigator from '../Navigation/Navigation';
import './Header.css';
import logo from '../../images/header-logo.svg';

const Header = ({ loggedIn }) => {
  return (
    <header
      className={`header ${
        location.pathname === "/" ? "header_type_not-auth" : ""
      }`}
    >
      <Link to='/'>
        <img src={logo} alt='Логотип' className='header__logo' />
      </Link>
      <Navigator loggedIn={loggedIn} />
    </header>
  );
};

export default Header;
