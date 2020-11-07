import makeRequest from '../utils/request';

export const addProductApi = (payload) => makeRequest('post', '/product/', payload);

export const getProductlist = () => makeRequest('get', '/product/');

export const filterProductsApi = (search, page) => makeRequest('get', `/filter_products/?search=${search}&page=${page}`);

export const deleteProductApi = (id) => makeRequest('delete', `/product/${id}`);

export const updateProductApi = (payload, id) => makeRequest('put', `/product/${id}`, payload);
