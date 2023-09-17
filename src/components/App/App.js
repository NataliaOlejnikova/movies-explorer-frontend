import { useState, useEffect } from 'react';
import {
  Route,
  Routes,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import Main from '../../pages/Main/Main';
import Movies from '../../pages/Movies/Movies';
import SavedMovies from '../../pages/SavedMovies/SavedMovies';
import Profile from '../../pages/Profile/Profile';
import SignUp from '../../pages/SignUp/SignUp';
import SignIn from '../../pages/SignIn/SignIn';
import NotFound from '../../pages/NotFound/NotFound';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import mainApi from '../../utils/MainApi';
import Preloader from '../Preloader/Preloader';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import UnauthorizedRoute from '../UnauthorizedRoute/UnauthorizedRoute';
import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittingError, setSubmittingError] = useState('');

  const [currentUser, setCurrentUser] = useState();
  const [savedMovies, setSavedMovies] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();

  function handleSignIn({ email, password }) {
    setIsSubmitting(true);
    setSubmittingError('');
    mainApi.signIn({ email, password })
      .then(() => {
        setCurrentUser({ email });
        navigate('/movies', { replace: true });
      })
      .catch((err) => {
        if (err.message.includes('401')) {
          setSubmittingError('Указана неправильная почта или пароль');
        } else {
          setSubmittingError('Что-то пошло не так! Попробуйте ещё раз.');
        }
        console.log(err);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  }

  function handleSignUp({ email, password, name }) {
    setIsSubmitting(true);
    setSubmittingError('');
    mainApi.signUp({ email, password, name })
      .then(() => handleSignIn({ email, password }))
      .catch((err) => {
        if (err.message.includes('409')) {
          setSubmittingError('Пользователь с указанным email уже зарегистрирован');
        } else if (err.message.includes('400')) {
          setSubmittingError('Переданы некорректные данные при создании пользователя');
        } else {
          setSubmittingError('Что-то пошло не так! Попробуйте ещё раз.');
        }
        console.log(err);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  }

  function handleUpdateUser({ email, name }) {
    setIsSubmitting(true);
    setSubmittingError('');
    mainApi.updateUser({ email, name })
      .then((user) => {
        setCurrentUser(user);
      })
      .catch((err) => {
        if (err.message.includes('409')) {
          setSubmittingError('Пользователь с указанным email уже зарегистрирован');
        } else if (err.message.includes('400')) {
          setSubmittingError('Переданы некорректные данные при обновлении профиля');
        } else {
          setSubmittingError('Что-то пошло не так! Попробуйте ещё раз.');
        }
        console.log(err);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  }

  function handleAddMovie(movie) {
    mainApi.addMovie(movie)
      .then((addedMovie) => {
        setSavedMovies((prev) => [...prev, addedMovie]);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleDeleteMovie(movie) {
    const { _id: deleteId } = savedMovies.find(({ movieId }) => movie.movieId === movieId);
    mainApi.deleteMovie(deleteId)
      .then(() => {
        setSavedMovies((prev) => prev.filter(({ _id }) => _id !== deleteId));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleSignOut() {
    setIsLoading(true);
    mainApi.signOut()
      .then(() => {
        setCurrentUser();
        localStorage.clear();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  useEffect(() => {
    if (!currentUser || !currentUser._id) {
      setIsLoading(true);
      mainApi.getUser()
        .then((userInfo) => {
          setCurrentUser(userInfo);
        })
        .then(() => mainApi.getMovies())
        .then((movies) => {
          setSavedMovies(movies);
        })
        .catch((err) => {
          setCurrentUser();
          setSavedMovies([]);
          console.log(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [currentUser]);

  useEffect(() => {
    setSubmittingError('');
  }, [location]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      {isLoading
        ? <Preloader />
        : (
          <Routes>
            <Route path="/" element={(
              <Main />
            )} />
            <Route path="/movies" element={(
              <ProtectedRoute>
                <Movies
                  savedMovies={savedMovies}
                  onAddMovie={handleAddMovie}
                  onDeleteMovie={handleDeleteMovie}
                />
              </ProtectedRoute>
            )} />
            <Route path="/saved-movies" element={(
              <ProtectedRoute>
                <SavedMovies
                  savedMovies={savedMovies}
                  onDeleteMovie={handleDeleteMovie}
                />
              </ProtectedRoute>
            )} />
            <Route path="/profile" element={(
              <ProtectedRoute>
                <Profile
                  isSubmitting={isSubmitting}
                  submittingError={submittingError}
                  onSubmit={handleUpdateUser}
                  onSignOut={handleSignOut}
                />
              </ProtectedRoute>
            )} />
            <Route path="/signup" element={(
              <UnauthorizedRoute>
                <SignUp
                  isSubmitting={isSubmitting}
                  submittingError={submittingError}
                  onSubmit={handleSignUp}
                />
              </UnauthorizedRoute>
            )} />
            <Route path="/signin" element={(
              <UnauthorizedRoute>
                <SignIn
                  isSubmitting={isSubmitting}
                  submittingError={submittingError}
                  onSubmit={handleSignIn}
                />
              </UnauthorizedRoute>
            )} />
            <Route path="*" element={(
              <NotFound />
            )} />
          </Routes>
        )
      }
    </CurrentUserContext.Provider>
  );
}

export default App;
