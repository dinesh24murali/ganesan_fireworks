import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getSalesList, getSalesData, deleteSales, setSalesFilter } from '../actions/sales';
import { filterCustomers } from '../actions/customer';

import SalesList from '../components/Sales/SalesList/SalesList';

const mapStateToProps = (state) => ({
  salesList: state.sales.salesList,
  hasNextPage: state.sales.hasNextPage,
  hasPreviousPage: state.sales.hasPreviousPage,
  customerList: state.customer.customerList,
  total: state.sales.total,
  customer: state.sales.filters.customer,
});

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    getSalesList,
    getSalesData,
    filterCustomers,
    deleteSales,
    setSalesFilter,
  },
  dispatch,
);

export default connect(mapStateToProps, mapDispatchToProps)(SalesList);
