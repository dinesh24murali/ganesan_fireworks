import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getSalesList } from '../actions/sales';

import SalesList from '../components/Sales/SalesList/SalesList';

const mapStateToProps = (state) => ({
  salesList: state.sales.salesList,
});

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    getSalesList,
  },
  dispatch,
);

export default connect(mapStateToProps, mapDispatchToProps)(SalesList);
