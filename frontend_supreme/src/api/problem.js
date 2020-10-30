import makeRequest from '../utils/request';

export const addProductApi = (payload) => makeRequest('post', '/product/', payload);

export const getProductlist = () => makeRequest('get', '/product/');

export const filterProductsApi = (search) => makeRequest('get', `/filter_products/?search=${search}`);

export const updateProductApi = (payload, id) => makeRequest('put', `/product/${id}`, payload);
