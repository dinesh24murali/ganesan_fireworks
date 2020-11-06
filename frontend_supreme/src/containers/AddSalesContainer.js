import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { filterCustomers } from '../actions/customer';

import { addSales, clearAddEditSalesStatus } from '../actions/sales';
import { showWarningToast } from '../actions/toast';

import AddSales from '../components/Sales/AddSales/AddSales';

const mapStateToProps = (state) => ({
  salesList: state.sales.salesList,
  customerList: state.customer.customerList,
  addEditSalesStatus: state.appStatus.addEditSalesStatus,
});

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    addSales,
    filterCustomers,
    showWarningToast,
    clearAddEditSalesStatus,
  },
  dispatch,
);

export default connect(mapStateToProps, mapDispatchToProps)(AddSales);
