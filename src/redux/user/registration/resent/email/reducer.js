import {
  RESENT_EMAIL_CODE_FAILURE,
  RESENT_EMAIL_CODE_SUCCESS,
  RESENT_EMAIL_CODE_START,
  REFRESH_RESENT_EMAIL_CODE_DATA,
  LOG_OUT,
} from './constants';

const initialState = {
  loading: false,
  data: {},
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case RESENT_EMAIL_CODE_START:
      return {...state, loading: true};
    case RESENT_EMAIL_CODE_SUCCESS:
      return {...state, data: {...payload}, loading: true};
    case RESENT_EMAIL_CODE_FAILURE:
      return {...state, loading: false};
    case REFRESH_RESENT_EMAIL_CODE_DATA:
      return {...initialState};
    case LOG_OUT:
      return {...initialState};
    default:
      return state;
  }
};
