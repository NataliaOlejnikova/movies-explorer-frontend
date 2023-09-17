import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import CurrentUserContext from '../../contexts/CurrentUserContext';

function UnauthorizedRoute({ children }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    currentUser ? <Navigate to="/movies" replace /> : children
  );
}

export default UnauthorizedRoute;
