import {
  SET_REGISTRATION_PASSWORDS_START,
  SET_REGISTRATION_PASSWORDS_FAILURE,
  SET_REGISTRATION_PASSWORDS_SUCCESS,
  SET_ANONYMOUS_TYPE_START,
  SET_ANONYMOUS_TYPE_SUCCESS,
  SET_ANONYMOUS_TYPE_FAILURE,
  LOG_OUT,
} from './constants';

const initialState = {
  loading: false,
  data: {
    password: '',
    confirmationPassword: '',
  },
  anonType: {
    loading: false,
    data: {},
  },
};
export default (state = initialState, {type, payload}) => {
  switch (type) {
    case SET_REGISTRATION_PASSWORDS_START:
      return {...state, loading: true};
    case SET_REGISTRATION_PASSWORDS_SUCCESS:
      return {...state, data: {...payload}, loading: false};
    case SET_REGISTRATION_PASSWORDS_FAILURE:
      return {...state, loading: false};
    case SET_ANONYMOUS_TYPE_START:
      return {
        ...state,
        anonType: {...state.anonType, loading: true},
      };
    case SET_ANONYMOUS_TYPE_SUCCESS:
      return {
        ...state,
        anonType: {
          ...state.anonType,
          loading: false,
          data: {...payload},
        },
      };
    case SET_ANONYMOUS_TYPE_FAILURE:
      return {
        ...state,
        anonType: {
          ...state.anonType,
          loading: false,
        },
      };
    case LOG_OUT:
      return {...initialState};
    default:
      return state;
  }
};
