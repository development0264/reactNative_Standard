import {
  SET_RESTORE_PASSWORD_START,
  SET_RESTORE_PASSWORD_SUCCESS,
  SET_RESTORE_PASSWORD_FAILURE,
  SET_RESTORE_DATA_START,
  SET_RESTORE_DATA_SUCCESS,
  SET_RESTORE_DATA_FAILURE,
  RESET_RESTORE_PASSWORD,
  SET_RESTORE_PASSWORD_CREATE_START,
  SET_RESTORE_PASSWORD_CREATE_SUCCESS,
  SET_RESTORE_PASSWORD_CREATE_FAILURE,
  LOG_OUT,
} from './constants';

const initialState = {
  loading: false,
  response: {},
  data: {
    loading: false,
    response: {},
  },
  createPassword: {
    loading: false,
    data: {},
  },
};
export default (state = initialState, {type, payload}) => {
  switch (type) {
    case SET_RESTORE_PASSWORD_START:
      return {...state, loading: true};
    case SET_RESTORE_PASSWORD_SUCCESS:
      return {...state, loading: false, response: {...payload}};
    case SET_RESTORE_PASSWORD_FAILURE:
      return {...state, loading: false};
    case SET_RESTORE_DATA_START:
      return {...state, data: {...state.data, loading: true}};
    case SET_RESTORE_DATA_SUCCESS:
      return {
        ...state,
        data: {...state, loading: false, response: {...payload}},
      };
    case SET_RESTORE_DATA_FAILURE:
      return {
        ...state,
        data: {...state, loading: false},
      };
    case RESET_RESTORE_PASSWORD:
      return {...initialState};
    case SET_RESTORE_PASSWORD_CREATE_START:
      return {
        ...state,
        createPassword: {...state.createPassword, loading: true},
      };
    case SET_RESTORE_PASSWORD_CREATE_SUCCESS:
      return {
        ...state,
        createPassword: {
          ...state.createPassword,
          loading: false,
          data: {...payload},
        },
      };
    case SET_RESTORE_PASSWORD_CREATE_FAILURE:
      return {
        ...state,
        createPassword: {
          ...state.createPassword,
          loading: false,
        },
      };
    case LOG_OUT:
      return {...initialState};
    default:
      return state;
  }
};
