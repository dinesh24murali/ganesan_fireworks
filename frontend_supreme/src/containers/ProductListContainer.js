import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getProducts, addProduct, updateProduct, filterProducts, deleteProduct } from '../actions/product';

import ProductList from '../components/Product/ProductList/ProductList';

const mapStateToProps = (state) => ({
  productList: state.product.productList,
  hasNextPage: state.product.hasNextPage,
  hasPreviousPage: state.product.hasPreviousPage,
  total: state.product.total,
});

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    getProducts,
    addProduct,
    deleteProduct,
    updateProduct,
    filterProducts,
  },
  dispatch,
);

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
