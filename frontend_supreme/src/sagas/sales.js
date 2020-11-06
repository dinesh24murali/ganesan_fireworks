import { call, put, takeLatest } from 'redux-saga/effects';

import ActionTypes from '../constants/ActionTypes';
import { getSaleslist, addSalesApi } from '../api/sales';
import { showErrorToast, showSuccessToast } from '../actions/toast';
import { setAddEditSalesStatus } from '../actions/sales';

function* getSales() {
  try {
    const resp = yield call(getSaleslist);
    yield put({
      type: `${ActionTypes.GET_SALES}_SUCCESS`,
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

export default function* loadSalesSaga() {
  yield takeLatest(ActionTypes.GET_SALES, getSales);
  yield takeLatest(ActionTypes.ADD_SALES, addSales);
  // yield debounce(500, ActionTypes.FILTER_CUSTOMERS, filterCustomers);
}
