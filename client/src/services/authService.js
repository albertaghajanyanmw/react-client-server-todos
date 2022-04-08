import cookie from 'react-cookies';
import { post } from 'services/client';
import lsConstants from 'constants/local-storage';
import { apiEndpoints } from '../configs';

export const AUTH_TOKEN = 'auth_token';

const isLoggedIn = () => localStorage.getItem(lsConstants.CURRENT_USER) ? JSON.parse(localStorage.getItem(lsConstants.CURRENT_USER)) : false;
const getCurrentUser = () => localStorage.getItem(lsConstants.CURRENT_USER) ? JSON.parse(localStorage.getItem(lsConstants.CURRENT_USER)) : false;

const logOut = () => {
  localStorage.clear();
  cookie.remove(AUTH_TOKEN);
}

export default {
  login: (data, asGuest = false) => {
    const options = {
      url: asGuest ? apiEndpoints.loginGuest : apiEndpoints.login,
      data
    };
    return post(options).then(result => {
      cookie.save(AUTH_TOKEN, result.data.token, { path: '/', maxAge: 86400 });
      return result;
    }).catch(error => {
      return Promise.reject(error);
    });
  },
  register: async (data) => {
    const options = { url: `${apiEndpoints.register}`, data};
    return post(options);
  },
  registerGuest: async (data) => {
    const options = { url: `${apiEndpoints.registerGuest}`, data};
    return post(options);
  },
  logOut: () => {
    localStorage.clear();
    cookie.remove(AUTH_TOKEN);
  }
}

export { isLoggedIn, logOut, getCurrentUser };