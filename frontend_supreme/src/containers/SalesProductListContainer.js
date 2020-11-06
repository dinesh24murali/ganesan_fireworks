import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


import { filterProducts } from '../actions/product';
import SalesProductList from '../components/Sales/SalesProductList/SalesProductList';

const mapStateToProps = (state) => ({
  productList: state.product.productList,
});

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    filterProducts,
  },
  dispatch,
);

export default connect(mapStateToProps, mapDispatchToProps)(SalesProductList);
