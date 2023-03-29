import { Axios } from './Axios.js';
export const axios = new Axios(
  {
    timeout: 30000,
    withCredentials: true,
    headers: {
      'X-Requested-With': 'XMLHttpRequest'
    }
  },
  // webpackConfig.VUE_APP_API_URL
);
