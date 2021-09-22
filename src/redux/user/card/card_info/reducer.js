import {
  GET_CARD_INFO_DATA_FAILURE,
  GET_CARD_INFO_DATA_START,
  GET_CARD_INFO_DATA_SUCCESS,
  LOG_OUT,
} from './constants';

const initialState = {
  data: {},
  loading: false,
};
export default (state = initialState, {type, payload}) => {
  switch (type) {
    case GET_CARD_INFO_DATA_START:
      return {...state, loading: true};
    case GET_CARD_INFO_DATA_SUCCESS:
      return {...state, loading: false, data: {...payload}};
    case GET_CARD_INFO_DATA_FAILURE:
      return {...state, loading: false};
    case LOG_OUT:
      return {...initialState};
    default:
      return state;
  }
};
