import jwtDecode from 'jwt-decode';

const isValidToken = (accessToken) => {
  if (!accessToken) {
    return false;
  }

  const decoded = jwtDecode(accessToken);
  const currentTime = Date.now() / 1000;

  return decoded.exp > currentTime;
};

const getSession = () => {
  try {
    return JSON.parse(localStorage.getItem('session'))
    // eslint-disable-next-line no-empty
  } catch (error) { }
}
const setSession = (session) => localStorage.setItem('session', JSON.stringify(session));
const removeSession = () => localStorage.removeItem('session');

const getUser = () => {
  try {
    return JSON.parse(localStorage.getItem('user'))
    // eslint-disable-next-line no-empty
  } catch (error) { }
};
const setUser = (user) => localStorage.setItem('user', JSON.stringify(user));
const removeUser = () => localStorage.removeItem('user');

const getAccessToken = () => {
  const session = getSession();
  return session?.accessToken?.token;
};

const getRefreshToken = () => {
  const session = getSession();
  return session?.refreshToken;
};


export { isValidToken, getAccessToken, getRefreshToken, getSession, getUser, setSession, setUser, removeSession, removeUser };
