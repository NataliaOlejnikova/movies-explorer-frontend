import React from 'react';
import './Promo.css';
import promoImg from '../../images/main-picture.png';
import { HashLink } from 'react-router-hash-link';

function Promo() {
  return (
    <section className="promo">
      <div className="promo__right">
        <h1 className="promo__header">
          Учебный проект студента факультета Веб&#8209;разработки.
        </h1>
        <p className="promo__description">
          Листайте ниже, чтобы узнать больше про этот проект и его создателя.
        </p>
        <HashLink className="promo__about-link" to="#project">
            Узнать больше
          </HashLink>
      </div>
      <img
        className="promo__picture"
        alt="Изображение Земли из надписей 'web'"
        src={promoImg}
      />
    </section>
  );
}

export default Promo;
