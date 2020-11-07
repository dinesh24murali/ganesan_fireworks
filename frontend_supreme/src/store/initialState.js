const initialState = {
  sales: {
    salesList: [],
    hasNextPage: null,
    hasPreviousPage: null,
    editSale: {},
    total: 0,
    filters: { customer: null },
  },
  customer: {
    customerList: [],
    hasNextPage: null,
    hasPreviousPage: null,
    total: 0,
  },
  product: {
    productList: [],
    hasNextPage: null,
    hasPreviousPage: null,
    total: 0,
  },
  appStatus: {
    toast: { type: null, show: false, message: '' },
    addEditSalesStatus: { isAdded: null, success: null },
  },
};

export default initialState;
