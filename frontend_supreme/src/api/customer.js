import makeRequest from '../utils/request';

export const addCustomerApi = (payload) => makeRequest('post', '/customer/', payload);

export const getCustomerlist = () => makeRequest('get', '/customer/');

export const filterCustomersApi = (search, page) => makeRequest('get', `/filter_customers/?search=${search}&page=${page}`);

export const updateCustomerApi = (payload, id) => makeRequest('put', `/customer/${id}`, payload);

export const deleteCustomerApi = (id) => makeRequest('delete', `/customer/${id}`);
