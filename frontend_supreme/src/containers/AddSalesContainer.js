import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { filterCustomers } from '../actions/customer';
import { addSales, clearAddEditSalesStatus, updateSales, getSales, clearEditSalesData } from '../actions/sales';
import { showWarningToast } from '../actions/toast';

import AddSales from '../components/Sales/AddSales/AddSales';

const mapStateToProps = (state) => ({
  salesList: state.sales.salesList,
  customerList: state.customer.customerList,
  addEditSalesStatus: state.appStatus.addEditSalesStatus,
  editSale: state.sales.editSale,
});

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    addSales,
    updateSales,
    getSales,
    filterCustomers,
    showWarningToast,
    clearEditSalesData,
    clearAddEditSalesStatus,
  },
  dispatch,
);

export default connect(mapStateToProps, mapDispatchToProps)(AddSales);
