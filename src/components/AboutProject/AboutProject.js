import './AboutProject.css';

function AboutProject() {
  return (
    <section className="project" id="project">
        <h2 className="project__title">
          О проекте
        </h2>
        <ul className="project__items project__list">
          <li className="project__item">
            <h3 className="project__item-title">
              Дипломный проект включал 5 этапов
            </h3>
            <p className="project__item-description">
              Составление плана, работу над бэкендом, вёрстку, добавление
              функциональности и финальные доработки.
            </p>
          </li>
          <li className="project__item">
            <h3 className="project__item-title">
              На выполнение диплома ушло 5 недель
            </h3>
            <p className="project__item-description">
              У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
              соблюдать, чтобы успешно защититься.
            </p>
          </li>
        </ul>
        <ul className="project__stages project__list">
          <li className="project__stage">
            <h4 className="project__stage-title project__stage-title_first">1 неделя</h4>
            <p className="project__stage-description">Back-end</p>
          </li>
          <li className="project__stage">
            <h4 className="project__stage-title">4 недели</h4>
            <p className="project__stage-description">Front-end</p>
          </li>
        </ul>
    </section>
  );
}

export default AboutProject;
