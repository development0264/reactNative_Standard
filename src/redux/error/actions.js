import {ERROR_CACHES, REFRESH_ERROR_STATE, LOG_OUT} from './constants';

export const errorCatch = error => ({
  type: ERROR_CACHES,
  payload: error.response.data,
});
export const refresh = () => ({
  type: LOG_OUT,
});
export const refreshErrorState = () => ({
  type: REFRESH_ERROR_STATE,
});
