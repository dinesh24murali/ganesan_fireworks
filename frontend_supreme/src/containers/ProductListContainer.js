import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getProducts } from '../actions/product';

import ProductList from '../components/Product/ProductList/ProductList';

const mapStateToProps = state => {
  return {
    productList: state.product.productList,
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
        getProducts,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
