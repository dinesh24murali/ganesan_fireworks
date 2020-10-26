import { all, fork } from 'redux-saga/effects';
import product from './product';

function* rootSaga() {
  yield all([
    fork(product),
  ]);
}

export default rootSaga;

