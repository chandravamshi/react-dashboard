import axios from 'axios'
import endpoints from 'endpoints'
import { toast } from 'react-toastify'
import { getAccessToken, getRefreshToken, getUser, removeSession, removeUser, setSession } from 'utils/auth'

axios.defaults.baseURL = "https://prod-api.elithair.tech"
// axios.defaults.baseURL = "https://staging-api.elithair.tech"
// axios.defaults.baseURL = "http://localhost:8000"
axios.defaults.headers['Access-Control-Allow-Origin'] = '*'

axios.interceptors.request.use(async (config) => {
  const token = getAccessToken()
  if (token) {
    config.headers.Authorization = token
  }
  return config
})

const serverErrorMessage = "Something went wrong, Please try again later.";

axios.interceptors.response.use(
  (response) => response?.data,
  async (error) => {
    const originalConfig = error.config;
    if (error.response) {
      // Access Token was expired
      if (error.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;
        try {
          const { data } = await axios.post(endpoints.renewAccessToken, {
            refreshToken: getRefreshToken(),
            username: getUser()?.username,
          });
          setSession(data)
          return axios(originalConfig);
        } catch (_error) {
          toast.error("Failed to generate a new Access Token, Please login again.")
          setTimeout(() => {
            removeSession()
            removeUser()
            window.location.reload()
          }, 1500);
          return Promise.reject(_error);
        }
      }
    }
    const message = error.response?.data?.message || serverErrorMessage
    toast.error(message)
    return Promise.reject(error.response?.data || serverErrorMessage)
  }
)
