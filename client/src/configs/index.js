import routes from './route';
import serverConfig from './server-config.json';
import apiEndpoints from './api-endpoints.json';
import envSettings from './envSettings.json';
import variables from './variables';

const serverUrl =
  process.env.NODE_ENV === 'production'
    ? envSettings.host
    : `${serverConfig.protocol}://${serverConfig.host}:${serverConfig.port}`;

export { routes, serverUrl, apiEndpoints, variables };
