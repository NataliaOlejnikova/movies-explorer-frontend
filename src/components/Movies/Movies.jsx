import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";

import "./Movies.css";

const movies = [
  {
    name: "33 слова о дизайне",
    duration: "movie",
    img: "https://avatars.mds.yandex.net/i?id=844ae563cc976aa2d81a3616fed2ca1129f0fc52-9721849-images-thumbs&n=13",
    isSaved: true,
  },
  {
    name: "33 слова о дизайне",
    duration: "movie",
    img: "https://avatars.mds.yandex.net/i?id=844ae563cc976aa2d81a3616fed2ca1129f0fc52-9721849-images-thumbs&n=13",
    isSaved: false,
  },
  {
    name: "33 слова о дизайне",
    duration: "movie",
    img: "https://avatars.mds.yandex.net/i?id=844ae563cc976aa2d81a3616fed2ca1129f0fc52-9721849-images-thumbs&n=13",
    isSaved: true,
  },
  {
    name: "33 слова о дизайне",
    duration: "movie",
    img: "https://avatars.mds.yandex.net/i?id=844ae563cc976aa2d81a3616fed2ca1129f0fc52-9721849-images-thumbs&n=13",
    isSaved: false,
  },
  {
    name: "33 слова о дизайне",
    duration: "movie",
    img: "https://avatars.mds.yandex.net/i?id=844ae563cc976aa2d81a3616fed2ca1129f0fc52-9721849-images-thumbs&n=13",
    isSaved: true,
  },
  {
    name: "33 слова о дизайне",
    duration: "movie",
    img: "https://avatars.mds.yandex.net/i?id=844ae563cc976aa2d81a3616fed2ca1129f0fc52-9721849-images-thumbs&n=13",
    isSaved: true,
  },
  {
    name: "33 слова о дизайне",
    duration: "movie",
    img: "https://avatars.mds.yandex.net/i?id=844ae563cc976aa2d81a3616fed2ca1129f0fc52-9721849-images-thumbs&n=13",
    isSaved: true,
  },
  {
    name: "33 слова о дизайне",
    duration: "movie",
    img: "https://avatars.mds.yandex.net/i?id=844ae563cc976aa2d81a3616fed2ca1129f0fc52-9721849-images-thumbs&n=13",
    isSaved: true,
  },
];

const Movies = () => {
  return (
    <>      
      <section className="movies">
        <div className="movies__content">
          <SearchForm />

          <MoviesCardList
            isSavedMoviesPage={false}
            movies={movies}
            savedMovies={movies}
          />
        </div>
      </section>     
    </>
  );
};

export default Movies;
