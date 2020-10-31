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

export const filterCustomers = (search) => ({
  type: ActionTypes.FILTER_CUSTOMERS,
  search,
});
