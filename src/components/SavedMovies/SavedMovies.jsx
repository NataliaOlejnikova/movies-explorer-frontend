import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import './SavedMovies.css';

const savedMovies = [
  {
    name: 'movie',
    duration: 'movie',
    img: 'https://avatars.mds.yandex.net/i?id=844ae563cc976aa2d81a3616fed2ca1129f0fc52-9721849-images-thumbs&n=13',
    isSaved: true,
  },
  {
    name: 'movie',
    duration: 'movie',
    img: 'https://avatars.mds.yandex.net/i?id=844ae563cc976aa2d81a3616fed2ca1129f0fc52-9721849-images-thumbs&n=13',
    isSaved: true,
  }
  
]
const SavedMovies = () => {
  return (
    <>    
      <section className='saved-movies'>
         <div className='saved-movies__content'>
          <SearchForm />
          <MoviesCardList
            isSavedMoviesPage={true}
            movies={savedMovies}
            isShowSaveBtn={false}
            isShowDeleteBtn={true}
            savedMovies={[]}
            onDelete={() => {}}
            isShowMoreButton={false}
          />
         </div>
      </section>
          
    </>
      
    
  );
};

export default SavedMovies;