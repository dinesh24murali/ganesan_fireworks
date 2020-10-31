import ActionTypes from '../constants/ActionTypes';

export const getProducts = () => ({
  type: ActionTypes.GET_PRODUCTS,
});

export const addProduct = (payload) => ({
  type: ActionTypes.ADD_PRODUCT,
  payload,
});

export const updateProduct = (id, payload) => ({
  type: ActionTypes.UPDATE_PRODUCT,
  payload,
  id,
});

export const filterProducts = (search) => ({
  type: ActionTypes.FILTER_PRODUCTS,
  search,
});
