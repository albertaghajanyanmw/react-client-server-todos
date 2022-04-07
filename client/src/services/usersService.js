import { get, post, put } from 'services/client';
import { apiEndpoints } from 'configs';

export default {
  getUsers: async (params) => {
    const options = { url: `${apiEndpoints.users}`, params: {...params} };
    return get(options);
  },
  getUser: async (id) => {
    const options = { url: apiEndpoints.user.replace(':userId', id)};
    return get(options);
  },
  sendFirebaseToken: async (id, data) => {
    const options = { url: apiEndpoints.updateFirebaseToken.replace(':userId', id), data};
    return put(options);
  }
}