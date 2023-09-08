import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className='footer'>
      <h3 className="footer__text">
          Учебный проект Яндекс.Практикум х BeatFilm.
        </h3>
      <div className='footer__bottom-block'>
        <span className='footer__copyright'>© 2023</span>
        <ul className='footer__links'>
          <li>
            <a
              className='footer__link'
              href='https://practicum.yandex.ru/'
              target='_blank'
              rel='noreferrer'
            >
              Яндекс.Практикум
            </a>
          </li>
          <li>
            <a
              className='footer__link'
              href='https://github.com/NataliaOlejnikova'
              target='_blank'
              rel='noreferrer'
            >
              Github
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
