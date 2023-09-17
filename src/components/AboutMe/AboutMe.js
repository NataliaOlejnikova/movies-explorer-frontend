import './AboutMe.css';
import studentImage from '../../images/student-image.jpg';

function AboutMe() {
  return (
    <section className="student" id="student">
      <h2 className="student__title">Студент</h2>
      <div className="student__about">
        <div className="student__info">
          <h3 className="student__name">Виталий</h3>
          <h4 className="student__job">Фронтенд-разработчик, 30 лет</h4>
          <p className="student__biography">
          Я родился и живу в Саратове, закончил факультет экономики СГУ. У
            меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь
            бегом. Недавно начал кодить. С 2015 года работал в компании
            СКБ Контур. После того, как прошёл курс по веб-разработке, начал
            заниматься фриланс-заказами и ушёл с постоянной работы.
          </p>
          <a
          className="student__link"
          href="https://github.com/NataliaOlejnikova"
          target="_blank"
          rel="noreferrer">
          Github
          </a>
        </div>
        <div className="student__image-container">
          <img
            className="student__image"
            src={ studentImage }
            alt="Фотография студента"
          />
        </div>
      </div>
    </section>
  );
}

export default AboutMe;
