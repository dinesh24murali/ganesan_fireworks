import { call, put, takeLatest, debounce } from 'redux-saga/effects';

import ActionTypes from '../constants/ActionTypes';
import { addCustomerApi, getCustomerlist, updateCustomerApi, filterCustomersApi } from '../api/customer';
import { showErrorToast, showSuccessToast } from '../actions/toast';
import { getCustomers as getCustomerAction } from '../actions/customer';

function* getCustomers() {
  try {
    const resp = yield call(getCustomerlist);
    yield put({
      type: `${ActionTypes.GET_CUSTOMERS}_SUCCESS`,
      data: resp.data,
    });
  } catch (e) {
    yield put(showErrorToast('Somthing went wrong'));
  }
}

function* addCustomer(args) {
  try {
    const resp = yield call(addCustomerApi, args.payload);
    yield put(showSuccessToast(`Added ${resp.data.name}`));
    yield put(getCustomerAction());
  } catch (e) {
    yield put(showErrorToast('Could not add Cracker'));
  }
}

function* updateCustomer(args) {
  try {
    const resp = yield call(updateCustomerApi, args.payload, args.id);
    yield put(showSuccessToast(`Updated ${resp.data.name}`));
    yield put(getCustomerAction());
  } catch (e) {
    yield put(showErrorToast('Could not update Cracker'));
  }
}

function* filterCustomers(args) {
  try {
    const resp = yield call(filterCustomersApi, args.search);
    yield put({
      type: `${ActionTypes.FILTER_CUSTOMERS}_SUCCESS`,
      data: resp.data,
    });
  } catch (e) {
    yield put(showErrorToast('Could not search Cracker'));
  }
}

export default function* loadCustomerSaga() {
  yield takeLatest(ActionTypes.GET_CUSTOMERS, getCustomers);
  yield debounce(500, ActionTypes.FILTER_CUSTOMERS, filterCustomers);
  yield takeLatest(ActionTypes.ADD_CUSTOMER, addCustomer);
  yield takeLatest(ActionTypes.UPDATE_CUSTOMER, updateCustomer);
}
