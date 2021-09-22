import {
  SET_REGISTRATION_EMAIL_START,
  SET_REGISTRATION_EMAIL_FAILURE,
  SET_REGISTRATION_EMAIL_SUCCESS,
  REFRESH_REGISTRATION_EMAIL,
  SET_REGISTRATION_CONFIRM_EMAIL_START,
  SET_REGISTRATION_CONFIRM_EMAIL_SUCCESS,
  SET_REGISTRATION_CONFIRM_EMAIL_FAILURE,
  LOG_OUT,
} from './constants';

const initialState = {
  emailData: {
    loading: false,
    response: {},
  },
  confirmCode: {
    data: {},
    loading: false,
  },
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case SET_REGISTRATION_EMAIL_START:
      return {...state, emailData: {...state.emailData, loading: true}};
    case SET_REGISTRATION_EMAIL_SUCCESS:
      return {
        ...state,
        emailData: {
          ...state.emailData,
          loading: false,
          response: {...payload},
        },
      };
    case SET_REGISTRATION_EMAIL_FAILURE:
      return {
        ...state,
        emailData: {...state.emailData, loading: false},
      };
    case SET_REGISTRATION_CONFIRM_EMAIL_START:
      return {
        ...state,
        confirmCode: {...state.confirmCode, loading: true},
      };
    case SET_REGISTRATION_CONFIRM_EMAIL_SUCCESS:
      return {
        ...state,
        confirmCode: {
          ...state.confirmCode,
          loading: false,
          data: {...payload},
        },
      };
    case SET_REGISTRATION_CONFIRM_EMAIL_FAILURE:
      return {
        ...state,
        confirmCode: {...state.confirmCode, loading: false},
      };
    case REFRESH_REGISTRATION_EMAIL:
      return {...state, emailData: {...initialState.emailData}};
    case LOG_OUT:
      return {...initialState};
    default:
      return state;
  }
};
