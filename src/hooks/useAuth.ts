import axios from 'axios';
import endpoints from 'endpoints';
import { useNavigate, useLocation } from 'react-router';
import useLocalStorage from './useLocalStorage';

export const useLocalSession = () => useLocalStorage('session', null)
export const useLocalUser = () => useLocalStorage('user', null)

const useAuth = () => {
  const [session, setSession] = useLocalSession();
  const [user, setUser] = useLocalUser();
  const { state } = useLocation()
  const navigate = useNavigate()
  const isAuthenticated = !!session;

  const login = async (username: string, password: string) => {
    const { status, data }= await axios.post(endpoints.login, { username, password });
    if(status === 1 && !!data) {
      const { user, accessToken, refreshToken } = data;
      setSession({ accessToken, refreshToken });
      setUser(user);
      // @ts-ignore
      navigate(state?.from || '/')
    }
  }

  const logout = () => {
    setSession(null);
    navigate('/auth/login')
  }

  return {isAuthenticated, session, user, login, logout};
};

export default useAuth;
