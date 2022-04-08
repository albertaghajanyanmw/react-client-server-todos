import { logOut } from 'services/authService';
import { routes } from 'configs/index';

export default function onUnauthorized(error, reactRouterHistory) {
  logOut();
  if (reactRouterHistory && reactRouterHistory.location &&
    reactRouterHistory.location.pathname &&
    (reactRouterHistory?.location?.pathname !== routes.login.path)) {
    reactRouterHistory.push(routes.login.path, {
      url: reactRouterHistory.createHref(reactRouterHistory.location),
    });
  }
}
