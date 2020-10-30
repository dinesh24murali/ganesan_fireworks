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
  },
};

export default initialState;
