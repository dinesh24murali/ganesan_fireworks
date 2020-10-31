import axios from 'axios';
import { baseUrl } from '../constants/AppConstants';

const APIRequest = axios.create({
  withCredentials: false,
});

const makeRequest = (method, url, data) => {
  try {
    return APIRequest({
      method,
      url: `${baseUrl}${url}`,
      data,
    });
  } catch (err) {
    return Promise.reject(err);
  }
};

export default makeRequest;
