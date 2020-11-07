import ActionTypes from '../constants/ActionTypes';

export const getSales = (id) => ({
  type: ActionTypes.GET_SALES,
  id,
});

export const getSalesData = (id) => ({
  type: ActionTypes.GET_SALES_DATA,
  id,
});

export const getSalesList = (page) => ({
  type: ActionTypes.GET_SALES_LIST,
  page,
});

export const addSales = (payload) => ({
  type: ActionTypes.ADD_SALES,
  payload,
});

export const updateSales = (id, payload) => ({
  type: ActionTypes.UPDATE_SALES,
  payload,
  id,
});

export const deleteSales = (id) => ({
  type: ActionTypes.DELETE_SALES,
  id,
});

export const filterSales = (search) => ({
  type: ActionTypes.FILTER_SALES,
  search,
});

export const setAddEditSalesStatus = (isAdded, success) => ({
  type: ActionTypes.ADD_EDIT_SALES_STATUS,
  isAdded,
  success,
});

export const clearAddEditSalesStatus = () => ({
  type: `CLEAR_${ActionTypes.ADD_EDIT_SALES_STATUS}`,
});

export const clearEditSalesData = () => ({
  type: ActionTypes.CLEAR_EDIT_SALES,
});

export const setSalesFilter = (customer) => ({
  type: ActionTypes.SET_SALES_LIST_FILTER,
  customer,
});
