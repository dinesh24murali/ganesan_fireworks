import { combineReducers } from 'redux';

import product from './product';
import sales from './sales';
import customer from './customer';
import appStatus from './appStatus';

const rootReducer = combineReducers({
  product,
  sales,
  customer,
  appStatus,
});

export default rootReducer;
