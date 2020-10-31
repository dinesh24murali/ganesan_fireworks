import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { addSales } from '../actions/sales';

import AddSales from '../components/Sales/AddSales/AddSales';

const mapStateToProps = (state) => ({
  salesList: state.sales.salesList,
});

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    addSales,
  },
  dispatch,
);

export default connect(mapStateToProps, mapDispatchToProps)(AddSales);
