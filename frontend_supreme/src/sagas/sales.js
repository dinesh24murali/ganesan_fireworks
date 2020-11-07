import { call, put, select, takeLatest } from 'redux-saga/effects';

import ActionTypes from '../constants/ActionTypes';
import { deleteSalesApi, getSaleslistApi, addSalesApi, updateSalesApi, getSalesApi } from '../api/sales';
import { showErrorToast, showSuccessToast } from '../actions/toast';
import { setAddEditSalesStatus, getSalesList as getSalesListAction } from '../actions/sales';

function* getSalesList(args) {
  try {
    const filters = yield select((state) => state.sales.filters);
    const resp = yield call(getSaleslistApi, args.page, filters.customer ? filters.customer.value : null);
    yield put({
      type: `${ActionTypes.GET_SALES_LIST}_SUCCESS`,
      data: resp.data,
    });
  } catch (e) {
    yield put(showErrorToast('Somthing went wrong'));
  }
}

function* addSales(args) {
  try {
    yield call(addSalesApi, args.payload);
    yield put(setAddEditSalesStatus(true, true));
    yield put(showSuccessToast('Sales added successfully'));
  } catch (e) {
    yield put(showErrorToast('Failed to add sales'));
  }
}

function* updateSales(args) {
  try {
    yield call(updateSalesApi, args.payload, args.id);
    yield put(setAddEditSalesStatus(false, true));
    yield put(showSuccessToast('Sales updated successfully'));
  } catch (e) {
    yield put(showErrorToast('Failed to update sales'));
  }
}

function* deleteSales(args) {
  try {
    yield call(deleteSalesApi, args.id);
    yield put(getSalesListAction(1));
    yield put(showSuccessToast('Sales deleted successfully'));
  } catch (e) {
    yield put(showErrorToast('Failed to delete sales'));
  }
}

function* getSalesData(args) {
  try {
    const resp = yield call(getSalesApi, args.id);
    yield put({
      type: `${ActionTypes.GET_SALES_DATA}_SUCCESS`,
      data: resp.data,
    });
  } catch (e) {
    yield put(showErrorToast('Failed to get sales'));
  }
}

function* getSales(args) {
  try {
    const resp = yield call(getSalesApi, args.id);
    yield put({
      type: `${ActionTypes.GET_SALES}_SUCCESS`,
      data: resp.data,
    });
  } catch (e) {
    yield put(showErrorToast('Failed to get sales'));
  }
}

export function* setSalesListFilters(args) {
  try {
    const resp = yield call(getSaleslistApi, 1, args.customer ? args.customer.value : '');
    yield put({
      type: `${ActionTypes.GET_SALES_LIST}_SUCCESS`,
      data: resp.data,
    });
  } catch (e) {
    yield put(showErrorToast('Failed to get sales'));
  }
}

export default function* loadSalesSaga() {
  yield takeLatest(ActionTypes.GET_SALES_LIST, getSalesList);
  yield takeLatest(ActionTypes.ADD_SALES, addSales);
  yield takeLatest(ActionTypes.UPDATE_SALES, updateSales);
  yield takeLatest(ActionTypes.GET_SALES_DATA, getSalesData);
  yield takeLatest(ActionTypes.GET_SALES, getSales);
  yield takeLatest(ActionTypes.DELETE_SALES, deleteSales);
  yield takeLatest(ActionTypes.SET_SALES_LIST_FILTER, setSalesListFilters);
}
