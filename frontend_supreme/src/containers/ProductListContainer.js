import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getProducts, addProduct, updateProduct, filterProducts } from '../actions/product';

import ProductList from '../components/Product/ProductList/ProductList';

const mapStateToProps = (state) => ({
  productList: state.product.productList,
});

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    getProducts,
    addProduct,
    updateProduct,
    filterProducts,
  },
  dispatch,
);

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
