import './Promo.css';
import { HashLink } from 'react-router-hash-link';

function Promo() {
  return (
    <section className="promo">
      <div className="promo__container">
        <div className="promo__text-container">
          <h1 className="promo__title">
            Учебный проект студента факультета <span className="promo__wrap">Веб-разработки.</span>
          </h1>
          <p className="promo__text">
            Листайте ниже, чтобы узнать больше про этот проект и его создателя.
          </p>
          <HashLink className="promo__link" to="#project">
            Узнать больше
          </HashLink>
        </div>
      </div>
    </section>
  );
}

export default Promo;
