import './Portfolio.css';

const Portfolio = () => {
  return (
    <section className='portfolio'>
      <h3 className='portfolio__title'>Портфолио</h3>
      <ul className='portfolio__projects'>
        <li className='portfolio__list'>
          <a
            className='portfolio__link'
            rel='noreferrer'
            href='https://github.com/NataliaOlejnikova/how-to-learn'
            target='_blank'
          >
            Статичный сайт <span>↗️</span>
          </a>          
        </li>
        <li className='portfolio__list'>
          <a
            className='portfolio__link'
            rel='noreferrer'
            href='https://github.com/NataliaOlejnikova/mesto4pr'
            target='_blank'
          >
            Адаптивный сайт <span>↗️</span>
          </a>
          
        </li>
        <li className='portfolio__list'>
          <a
            className='portfolio__link'
            rel='noreferrer'
            href='https://github.com/NataliaOlejnikova/react-mesto-api-full-gha'
            target='_blank'
          >
            Одностраничное приложение <span>↗️</span>
          </a>
        </li>
      </ul>
    </section>
  );
};

export default Portfolio;
