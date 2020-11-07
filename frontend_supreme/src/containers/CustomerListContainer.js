import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getCustomers, addCustomer, updateCustomer, filterCustomers, deleteCustomer } from '../actions/customer';

import CustomerList from '../components/Customer/CustomerList/CustomerList';

const mapStateToProps = (state) => ({
  customerList: state.customer.customerList,
  hasNextPage: state.customer.hasNextPage,
  hasPreviousPage: state.customer.hasPreviousPage,
  total: state.customer.total,
});

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    getCustomers,
    deleteCustomer,
    addCustomer,
    updateCustomer,
    filterCustomers,
  },
  dispatch,
);

export default connect(mapStateToProps, mapDispatchToProps)(CustomerList);
