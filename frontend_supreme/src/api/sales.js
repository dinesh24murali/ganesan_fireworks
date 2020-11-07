import makeRequest from '../utils/request';

export const getSaleslistApi = (pageNumber, customer) =>
  makeRequest('get', `/get_sales/?page=${pageNumber}${customer ? `&customer=${customer}` : ''}`);

export const addSalesApi = (payload) => makeRequest('post', '/add_sales/', payload);

export const updateSalesApi = (payload, id) => makeRequest('put', `/sales/${id}`, payload);

export const deleteSalesApi = (id) => makeRequest('delete', `/sales/${id}`);

export const getSalesApi = (id) => makeRequest('get', `/sales/${id}`);
