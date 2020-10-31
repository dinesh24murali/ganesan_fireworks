import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getCustomers, addCustomer, updateCustomer, filterCustomers } from '../actions/customer';

import CustomerList from '../components/Customer/CustomerList/CustomerList';

const mapStateToProps = (state) => ({
  customerList: state.customer.customerList,
});

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    getCustomers,
    addCustomer,
    updateCustomer,
    filterCustomers,
  },
  dispatch,
);

export default connect(mapStateToProps, mapDispatchToProps)(CustomerList);
