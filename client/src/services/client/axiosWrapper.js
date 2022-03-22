import * as axiosHelper from './axiosHelper';

const get = (options) => axiosHelper.apiClient('GET', options);

const put = (options) => axiosHelper.apiClient('PUT', options);

const post = (options) => axiosHelper.apiClient('POST', options);

const del = (options) => axiosHelper.apiClient('DELETE', options);

const head = (options) => axiosHelper.apiClient('HEAD', options);

export { get, post, head, put, del };