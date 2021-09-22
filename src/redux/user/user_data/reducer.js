import {
  GET_USER_INFO_START,
  GET_USER_INFO_SUCCESS,
  GET_USER_INFO_FAILURE,
  UPDATE_USER_INFO_START,
  UPDATE_USER_INFO_FAILURE,
  UPDATE_USER_INFO_SUCCESS,
  REFRESH_UPDATE_MESSAGE,
  LOG_OUT,
} from './constants';
const initialState = {
  error: null,
  loading: false,
  data: {},
  updateError: null,
  updateLoading: false,
  response: {},
};
export default (state = initialState, {type, payload}) => {
  switch (type) {
    case GET_USER_INFO_START:
      return {...state, loading: true};
    case GET_USER_INFO_SUCCESS:
      return {...state, loading: false, data: {...payload}};
    case GET_USER_INFO_FAILURE:
      return {...state, loading: false};
    case UPDATE_USER_INFO_START:
      return {...state, updateLoading: true};
    case UPDATE_USER_INFO_SUCCESS:
      return {
        ...state,
        updateLoading: false,
        data: {...payload},
        response: {message: 'OK'},
      };
    case UPDATE_USER_INFO_FAILURE:
      return {
        ...state,
        updateLoading: false,
      };
    case REFRESH_UPDATE_MESSAGE: {
      return {...state, response: initialState.response};
    }
    case LOG_OUT:
      return {...initialState};
    default:
      return state;
  }
};
