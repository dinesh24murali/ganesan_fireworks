import ActionTypes from '../constants/ActionTypes';

export const getProducts = () => ({
  type: ActionTypes.GET_PRODUCTS,
});

export const addProduct = (payload) => ({
  type: ActionTypes.ADD_PRODUCT,
  payload,
});

export const deleteProduct = (id) => ({
  type: ActionTypes.DELETE_PRODUCT,
  id,
});

export const updateProduct = (id, payload) => ({
  type: ActionTypes.UPDATE_PRODUCT,
  payload,
  id,
});

export const filterProducts = (search, pageNumber) => ({
  type: ActionTypes.FILTER_PRODUCTS,
  pageNumber,
  search,
});
