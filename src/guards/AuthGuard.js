import PropTypes from 'prop-types';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import LoadingScreen from '../components/LoadingScreen';

// ----------------------------------------------------------------------

AuthGuard.propTypes = {
  children: PropTypes.node,
};

export default function AuthGuard({ children }) {
  const { isAuthenticated } = useAuth();
  const { pathname } = useLocation();

  // if (!isInitialized) {
  //   return <LoadingScreen />;
  // }

  if (!isAuthenticated) {
    return <Navigate to={'/auth/login'} state={{ from: pathname }} />
  }
  return <>{children}</>;
}
