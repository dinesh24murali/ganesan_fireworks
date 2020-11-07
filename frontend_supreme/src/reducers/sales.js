import _assign from 'lodash/assign';
import _isNull from 'lodash/isNull';
import _isNumber from 'lodash/isNumber';
import _findIndex from 'lodash/findIndex';

import initialState from '../store/initialState';
import ActionTypes from '../constants/ActionTypes';

export default function (state = initialState.sales, action) {
  switch (action.type) {
    case `${ActionTypes.GET_SALES_LIST}_SUCCESS`:
      return _assign({}, state, {
        salesList: action.data.results,
        total: _isNumber(action.data.count) ? action.data.count : 0,
        hasNextPage: _isNull(action.data.next) ? false : true,
        hasPreviousPage: _isNull(action.data.previous) ? false : true,
      });
    case `${ActionTypes.GET_SALES_DATA}_SUCCESS`: {
      const tempList = JSON.parse(JSON.stringify(state.salesList));
      const index = _findIndex(tempList, (sale) => sale.id === action.data.sales.id);
      if (index >= 0) {
        tempList[index].sales_data = action.data.sales_data;
      }
      return _assign({}, state, {
        salesList: tempList,
      });
    }
    case `${ActionTypes.GET_SALES}_SUCCESS`:
      return _assign({}, state, {
        editSale: action.data,
      });
    case ActionTypes.CLEAR_EDIT_SALES:
      return _assign({}, state, {
        editSale: {},
      });
    case ActionTypes.SET_SALES_LIST_FILTER:
      return _assign({}, state, {
        filters: { customer: action.customer },
      });
    default:
      return state;
  }
}
