import { all, fork } from 'redux-saga/effects';
import product from './product';
import customer from './customer';
import sales from './sales';

function* rootSaga() {
  yield all([
    fork(customer),
    fork(product),
    fork(sales),
  ]);
}

export default rootSaga;
