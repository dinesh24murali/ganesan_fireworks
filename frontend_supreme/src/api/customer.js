import makeRequest from '../utils/request';

export const addCustomerApi = (payload) => makeRequest('post', '/customer/', payload);

export const getCustomerlist = () => makeRequest('get', '/customer/');

export const filterCustomersApi = (search) => makeRequest('get', `/filter_customers/?search=${search}`);

export const updateCustomerApi = (payload, id) => makeRequest('put', `/customer/${id}`, payload);
