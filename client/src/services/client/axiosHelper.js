import axios from 'axios';
import envSettings from 'configs/envSettings.json';
import cookie from 'react-cookies';
import onUnauthorized from 'helpers/errorHandlers';

const AUTH_TOKEN = 'auth_token';

const getAuthHeader = () => {
  const authToken = cookie.load(AUTH_TOKEN);
  if(authToken) {
      return {Authorization: `Bearer ${cookie.load(AUTH_TOKEN)}`};
  }
  return null;
};

const defaultHeaderHandler = request => {
  const authHeader = getAuthHeader();
  if(authHeader) {
      request.headers = authHeader;
  }
  return request;
};

let service;
if (envSettings.env === 'production') {
    service = axios.create({
        baseURL: `${envSettings.host}/api/`,
        timeout: 60000,
    });
} else {
    service = axios.create({
        // baseURL: `http://localhost:3000/api/`,
        baseURL: `http://localhost:4000/api/`,
        timeout: 60000,
    });
}

const setupInterceptors = (reactRouterHistory) => {
  service.interceptors.response.use(
    (response) => response,
    (error) => {
      const errMessage = error.message;
      const userIsNotAuthorized = errMessage === 'Request failed with status code 401';
      if (userIsNotAuthorized) {
        onUnauthorized(error, reactRouterHistory);
        return Promise.reject(error);
      }
      if (error.response &&
          error.response.data &&
          error.response.data.error &&
          (error.response.data.error.message === 'User is not authenticated.' || error.response.data.error.message === 'No auth token')) {
        onUnauthorized(error, reactRouterHistory);
        return Promise.reject(error);
      }
      return Promise.reject(error);
    }
  );
  service.interceptors.request.use(defaultHeaderHandler);
};

const apiClient = (method, options) => service.request({
  ...options,
  method
}).then(response => response).catch(error => Promise.reject(error));

export { apiClient, setupInterceptors };