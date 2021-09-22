import {
  RESENT_PHONE_NUMBER_FAILURE,
  RESENT_PHONE_NUMBER_SUCCESS,
  RESENT_PHONE_NUMBER_START,
  REFRESH_RESENT_PHONE_NUMBER_DATA,
  LOG_OUT,
} from './constants';

const initialState = {
  loading: false,
  data: {},
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case RESENT_PHONE_NUMBER_START:
      return {...state, loading: true};
    case RESENT_PHONE_NUMBER_SUCCESS:
      return {...state, data: {...payload}, loading: false};
    case RESENT_PHONE_NUMBER_FAILURE:
      return {...state, loading: false};
    case REFRESH_RESENT_PHONE_NUMBER_DATA:
      return {...initialState};
    case LOG_OUT:
      return {...initialState};
    default:
      return state;
  }
};
