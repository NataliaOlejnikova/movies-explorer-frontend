import { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import './App.css';
import Main from '../Main';
import { Login } from '../Login/Login';
import { Register } from '../Register/Register';
import { Profile } from '../Profile/Profile';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Page404 from '../NotFoundPage/NotFoundPage';
import * as auth from "../../utils/auth";
import mainApi from "../../utils/MainApi";
import moviesApi from "../../utils/MoviesApi";
import { CurrentUserContext } from "../../state/CurrentUserContext";
import ProtectedRouteElement from "../ProtectedRoute/ProtectedRoute";
import InfoTooltip from "../InfoTooltip/InfoTooltip";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentUser, setCurrentUser] = useState({
    name: "",
    email: "",
  });
  const [loggedIn, setLoggedIn] = useState(false);

  const [movies, setMovies] = useState([]);
  const [newMovies, setNewMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);

  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);
  const [statusInfoTooltip, setStatusInfoTooltip] = useState(false);

  const [error, setError] = useState("");

  const handleLogin = (email, password) => {
    auth
      .authorize(email, password)
      .then((res) => {
        localStorage.setItem("token", res.token);
        setLoggedIn(true);
        navigate("/movies");
      })
      .catch((err) => {
        console.log(err);
        if (err === 'Ошибка: 401') {
          setError('Неправильный логин или пароль');
        }
        if (err === 'Ошибка: 500') {
          setError('На сервере произошла ошибка');
        }
        else {
          setError('При авторизации пользователя произошла ошибка');
        }
      });
  };

  const handleRegister = (name, email, password) => {
    return auth
      .register(name, email, password)
      .then(() => {
        handleLogin(email, password);
      })
      .catch((err) => {
        console.log(err);
        if (err === 'Ошибка: 409') {
          setError('Пользователь с таким email уже существует');
        } else if (err === 'Ошибка: 500') {
          setError('На сервере произошла ошибка');
        } else {
          setError('При регистрации пользователя произошла ошибка');
        }
      })
  };

  const tokenCheck = () => {
    const token = localStorage.getItem("token");
    if (token) {
      auth
        .getContent(token)
        .then((res) => {
          if (res) {
            setCurrentUser(res);
            setLoggedIn(true);
            navigate(location.pathname, { replace: true });
          } else {
            setLoggedIn(false);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    tokenCheck();
  }, [loggedIn]);

  const getMovies = async () => {
    moviesApi
      .getMovies()
      .then((res) => {
        setMovies(res);
      })
      .catch((err) => console.log(err));
  }

  const getSavedMovies = async () => {
    mainApi
      .getSavedMovies()
      .then((res) => {
        setSavedMovies(res);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    if (loggedIn) {
      getMovies().then(() => getSavedMovies());
    }
  }, [loggedIn]);

  const updateMovies = () => {
    if (movies && savedMovies) {
      const newState = movies.map(movie => {
        const foundIndex = savedMovies.findIndex(savedMovie => savedMovie.movieId === movie.id);

        if (foundIndex >= 0) {
          return {...movie, _id: savedMovies[foundIndex]._id}
        }

        return movie
      })

      setNewMovies(newState);
    }
  }

  useEffect(() => {
    updateMovies()
  }, [movies, setMovies])

  const handleSaveMovie = (movie) => {
    mainApi
      .SaveMovie(movie)
      .then((res) => {
        const updatedSavedMovies = [...savedMovies, { ...res.data, id: res.data.movieId }];
        setSavedMovies(updatedSavedMovies);

        getSavedMovies().then(() => updateMovies());
      })
      .catch((err) => console.log(err));
  }

  const handleDeleteMovie = (movie) => {
    const id = movie._id;
    mainApi
      .deleteSavedMovie(id)
      .then(() => {
        const updatedSavedMovies = savedMovies.filter(movie => movie._id !== id);
        setSavedMovies(updatedSavedMovies);
      })
      .catch((err) => console.log(err));
  }

  function editProfileData(data) {
    return mainApi
      .editProfile(data)
      .then((res) => {
        setCurrentUser(res);
        setStatusInfoTooltip(true);
      })
      .catch((err) => {
        console.log(err);
        if (err) {
          setError("При обновлении профиля произошла ошибка.");
        }
        setStatusInfoTooltip(false);
        return err;
      })
      .finally(() => {
        setIsInfoTooltipPopupOpen(true);
      });
  }

  function signOut() {
    localStorage.removeItem("searchResults");
    localStorage.removeItem("checkboxState");
    localStorage.removeItem("searchQuery");
    localStorage.removeItem("token");
    setLoggedIn(false);
    setCurrentUser({});
    navigate("/");
  }

  function closeAllPopups() {
    setIsInfoTooltipPopupOpen(false);
  }

  return (
    <div className='page'>
      <CurrentUserContext.Provider value={currentUser}>
        <Routes>
          <Route path="/" element={<Main loggedIn={loggedIn} />} />
          <Route
            path="/signup"
            element={<Register handleRegister={handleRegister} error={error} setError={setError} />}
          />
          <Route
            path="/signin"
            element={<Login handleLogin={handleLogin} error={error} setError={setError} />}
          />
          <Route path="*" element={<Page404 />} />
          <Route path="/movies" element={
            <ProtectedRouteElement
              element={Movies}
              movies={movies}
              loggedIn={loggedIn}
              onMovieSave={handleSaveMovie}
              savedMovies={savedMovies}
              onMovieDelete={handleDeleteMovie}
            />
          } />
          <Route path="/saved-movies" element={
            <ProtectedRouteElement
              element={SavedMovies}
              movies={newMovies}
              savedMovies={savedMovies}
              onMovieDelete={handleDeleteMovie}
              loggedIn={loggedIn}
            />
          } />
          <Route path="/profile" element={
            <ProtectedRouteElement
              element={Profile}
              onEditProfile={editProfileData}
              signOut={signOut}
              loggedIn={loggedIn}
              error={error}
            />
          } />
        </Routes>
        <InfoTooltip
          isOpen={isInfoTooltipPopupOpen}
          onClose={closeAllPopups}
          status={statusInfoTooltip}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;