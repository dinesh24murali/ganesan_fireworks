import ActionTypes from '../constants/ActionTypes';

export const showErrorToast = (message) => ({
  type: ActionTypes.SHOW_ERROR_TOAST,
  message,
});

export const showWarningToast = (message) => ({
  type: ActionTypes.SHOW_WARN_TOAST,
  message,
});

export const showInfoToast = (message) => ({
  type: ActionTypes.SHOW_INFO_TOAST,
  message,
});

export const showSuccessToast = (message) => ({
  type: ActionTypes.SHOW_SUCCESS_TOAST,
  message,
});
export const hideToast = () => ({
  type: ActionTypes.HIDE_TOAST,
});
