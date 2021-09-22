import {
  LOGIN_USER_DATA_START,
  LOGIN_USER_DATA_SUCCESS,
  LOGIN_USER_DATA_FAILURE,
  REFRESH_USER_DATA,
  LOG_OUT,
} from './constants';

const initialState = {
  loading: false,
  data: {},
  auth: false,
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case LOGIN_USER_DATA_START:
      return {...state, loading: true};
    case LOGIN_USER_DATA_SUCCESS:
      return {...state, loading: false, data: payload, auth: true};
    case LOGIN_USER_DATA_FAILURE:
      return {...state, loading: false};
    case REFRESH_USER_DATA:
      return {...initialState};
    case LOG_OUT:
      return {...initialState};
    default:
      return state;
  }
};
