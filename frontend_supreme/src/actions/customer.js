import ActionTypes from '../constants/ActionTypes';

export const getCustomers = () => ({
  type: ActionTypes.GET_CUSTOMERS,
});

export const addCustomer = (payload) => ({
  type: ActionTypes.ADD_CUSTOMER,
  payload,
});

export const updateCustomer = (id, payload) => ({
  type: ActionTypes.UPDATE_CUSTOMER,
  payload,
  id,
});

export const deleteCustomer = (id) => ({
  type: ActionTypes.DELETE_CUSTOMER,
  id,
});

export const filterCustomers = (search, pageNumber) => ({
  type: ActionTypes.FILTER_CUSTOMERS,
  pageNumber,
  search,
});
