/* global location */
/* eslint no-restricted-globals: ["off", "location"] */
import React from 'react';
import { Link } from 'react-router-dom';
import Navigator from '../Navigation/Navigation';
import Logot from '../Logot/Logot';
import './Header.css';


const Header = ({ loggedIn }) => {
  return (
    <header
      className={`header ${
        location.pathname === "/" ? "header_type_not-auth" : ""
      }`}
    >
      <Link to='/'>
        <Logot />
      </Link>
      <Navigator loggedIn={loggedIn} />
    </header>
  );
};

export default Header;
