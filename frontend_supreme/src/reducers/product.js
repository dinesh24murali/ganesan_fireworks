import _assign from 'lodash/assign';

import initialState from '../store/initialState';
import ActionTypes from '../constants/ActionTypes';

export default function (state = initialState.product, action) {
  switch (action.type) {
    case `${ActionTypes.GET_PRODUCTS}_SUCCESS`:
      return _assign({}, state, {
        productList: action.data,
      });
    case `${ActionTypes.FILTER_PRODUCTS}_SUCCESS`:
      return _assign({}, state, {
        productList: action.data,
      });
    default:
      return state;
  }
}
