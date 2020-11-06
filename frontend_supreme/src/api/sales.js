import makeRequest from '../utils/request';

export const getSaleslist = () => makeRequest('get', '/sales/');

export const addSalesApi = (payload) => makeRequest('post', '/add_sales/', payload);
