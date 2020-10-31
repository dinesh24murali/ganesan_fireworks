import ActionTypes from '../constants/ActionTypes';

export const getSales = () => ({
  type: ActionTypes.GET_SALES,
});

export const getSalesList = () => ({
  type: ActionTypes.GET_SALES_LIST,
});

export const addSales = payload => ({
  type: ActionTypes.ADD_SALES,
  payload,
});

export const updateSales = (id, payload) => ({
  type: ActionTypes.UPDATE_SALES,
  payload,
  id,
});

export const filterSales = search => ({
  type: ActionTypes.FILTER_SALES,
  search,
});
