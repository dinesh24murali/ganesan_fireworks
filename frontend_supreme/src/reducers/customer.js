import _assign from 'lodash/assign';
import _isNull from 'lodash/isNull';
import _isNumber from 'lodash/isNumber';

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
        customerList: action.data.results,
        total: _isNumber(action.data.count) ? action.data.count : 0,
        hasNextPage: _isNull(action.data.next) ? false : true,
        hasPreviousPage: _isNull(action.data.previous) ? false : true,
      });
    default:
      return state;
  }
}
