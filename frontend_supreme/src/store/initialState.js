const initialState = {
  sales: {
    salesList: [],
    filters: {},
  },
  customer: {
    customerList: [],
  },
  product: {
    productList: [],
  },
  appStatus: {
    toast: { type: null, show: false, message: '' },
    addEditSalesStatus: { isAdded: null, success: null },
  },
};

export default initialState;
