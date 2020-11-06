import _assign from 'lodash/assign';

import initialState from '../store/initialState';
import ActionTypes from '../constants/ActionTypes';

export default function (state = initialState.customer, action) {
  switch (action.type) {
    case `${ActionTypes.GET_CUSTOMERS}_SUCCESS`:
      return _assign({}, state, {
        customerList: action.data,
      });
    case `${ActionTypes.FILTER_CUSTOMERS}_SUCCESS`:
      return _assign({}, state, {
        customerList: action.data,
      });
    default:
      return state;
  }
}
