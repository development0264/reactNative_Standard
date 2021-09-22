import {
  GET_FULL_NAME,
  GET_PHONE_NUMBER,
  REFRESH_REGISTRATION_DATA,
  SET_REGISTRATION_DATA_FAILURE,
  SET_REGISTRATION_DATA_START,
  SET_REGISTRATION_DATA_SUCCESS,
  SET_REGISTRATION_CONFIRM_PHONE_CODE_FAILURE,
  SET_REGISTRATION_CONFIRM_PHONE_CODE_START,
  SET_REGISTRATION_CONFIRM_PHONE_CODE_SUCCESS,
  REFRESH_CONFIRM_PHONE_DATA,
  REFRESH_REGISTRATION_PHONE_NUMBER_DATA,
  LOG_OUT,
  CREATE_PERSONAL_INFO
} from './constants';
import moment from "moment";

const initialState = {
  userInfo: {
    phone: '',
    firstName: '',
    lastName: '',
  },
  createAccount : {
    dob:{},
    ssn:'',
    address:'',
    city:'',
    state:'',
    zip:""
  },
  data: {
    loading: false,
    response: {},
  },
  confirmCode: {
    loading: false,
    response: {},
  },
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case GET_FULL_NAME:
      return {...state, userInfo: {...payload}};
    case CREATE_PERSONAL_INFO:
      return {...state,createAccount: {...payload}}
    case GET_PHONE_NUMBER:
      return {
        ...state,
        userInfo: {...state.userInfo, ...payload},
      };
    case SET_REGISTRATION_DATA_START:
      return {
        ...state,
        data: {...state.data, loading: true},
      };
    case SET_REGISTRATION_DATA_SUCCESS:
      return {
        ...state,
        data: {
          ...state.data,
          loading: false,
          response: {...payload},
        },
      };
    case SET_REGISTRATION_DATA_FAILURE:
      return {
        ...state,
        data: {...state.data, loading: false},
      };
    case SET_REGISTRATION_CONFIRM_PHONE_CODE_START:
      return {
        ...state,
        confirmCode: {...state.confirmCode, loading: true},
      };
    case SET_REGISTRATION_CONFIRM_PHONE_CODE_SUCCESS:
      return {
        ...state,
        confirmCode: {
          ...state.confirmCode,
          loading: false,
          response: {...payload},
        },
      };
    case SET_REGISTRATION_CONFIRM_PHONE_CODE_FAILURE:
      return {
        ...state,
        confirmCode: {
          ...state.confirmCode,
          loading: false,
        },
      };
    case REFRESH_CONFIRM_PHONE_DATA:
      return {...state, confirmCode: {...initialState.confirmCode}};
    case REFRESH_REGISTRATION_DATA:
      return {...state};
    case REFRESH_REGISTRATION_PHONE_NUMBER_DATA:
      return {
        ...state,
        data: {...state.data, error: initialState.data.error},
      };
    case LOG_OUT:
      return {...initialState};
    default:
      return state;
  }
};
