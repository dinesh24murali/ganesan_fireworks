import { call, put, takeLatest, debounce } from 'redux-saga/effects';

import ActionTypes from '../constants/ActionTypes';
import { addProductApi, getProductlist, updateProductApi, filterProductsApi, deleteProductApi } from '../api/problem';
import { showErrorToast, showSuccessToast } from '../actions/toast';
import { filterProducts as filterProductsAction } from '../actions/product';

function* getProducts() {
  try {
    const resp = yield call(getProductlist);
    yield put({
      type: `${ActionTypes.GET_PRODUCTS}_SUCCESS`,
      data: resp.data,
    });
  } catch (e) {
    yield put(showErrorToast('Somthing went wrong'));
  }
}

function* addProduct(args) {
  try {
    const resp = yield call(addProductApi, args.payload);
    yield put(showSuccessToast(`Added ${resp.data.name}`));
    yield put(filterProductsAction('', 1));
  } catch (e) {
    yield put(showErrorToast('Could not add Cracker'));
  }
}

function* deleteProduct(args) {
  try {
    yield call(deleteProductApi, args.id);
    yield put(showSuccessToast('Cracker deleted'));
    yield put(filterProductsAction('', 1));
  } catch (e) {
    yield put(showErrorToast('Could not add Cracker'));
  }
}

function* updateProduct(args) {
  try {
    const resp = yield call(updateProductApi, args.payload, args.id);
    yield put(showSuccessToast(`Updated ${resp.data.name}`));
    yield put(filterProductsAction('', 1));
  } catch (e) {
    yield put(showErrorToast('Could not update Cracker'));
  }
}

function* filterProducts(args) {
  try {
    const resp = yield call(filterProductsApi, args.search, args.pageNumber);
    yield put({
      type: `${ActionTypes.FILTER_PRODUCTS}_SUCCESS`,
      data: resp.data,
    });
  } catch (e) {
    yield put(showErrorToast('Could not search Cracker'));
  }
}

export default function* loadProductSaga() {
  yield takeLatest(ActionTypes.GET_PRODUCTS, getProducts);
  yield debounce(500, ActionTypes.FILTER_PRODUCTS, filterProducts);
  yield takeLatest(ActionTypes.ADD_PRODUCT, addProduct);
  yield takeLatest(ActionTypes.UPDATE_PRODUCT, updateProduct);
  yield takeLatest(ActionTypes.DELETE_PRODUCT, deleteProduct);
}
