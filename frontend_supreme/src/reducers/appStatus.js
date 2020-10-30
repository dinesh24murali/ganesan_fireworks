import _assign from 'lodash/assign';
import ActionTypes from '../constants/ActionTypes';
import initialState from '../store/initialState';

export default (state = initialState.appStatus, action) => {
  switch (action.type) {
    case ActionTypes.SHOW_ERROR_TOAST:
      return _assign({}, state, {
        toast: { type: 'danger', show: true, message: action.message },
      });
    case ActionTypes.SHOW_WARN_TOAST:
      return _assign({}, state, {
        toast: { type: 'warning', show: true, message: action.message },
      });
    case ActionTypes.SHOW_INFO_TOAST:
      return _assign({}, state, {
        toast: { type: 'primary', show: true, message: action.message },
      });
    case ActionTypes.SHOW_SUCCESS_TOAST:
      return _assign({}, state, {
        toast: { type: 'success', show: true, message: action.message },
      });
    case ActionTypes.HIDE_TOAST:
      return _assign({}, state, {
        toast: { type: '', show: false, message: action.message },
      });
    default:
      return state;
  }
};
