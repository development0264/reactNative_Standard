import {
  SEND_CARD_DATA_FAILURE,
  SEND_CARD_DATA_START,
  SEND_CARD_DATA_SUCCESS,
  REFRESH_CARD_DATA,
  LOG_OUT,
} from './constans';
const initialState = {
  loading: false,
  response: {},
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case SEND_CARD_DATA_START:
      return {...state, loading: true};
    case SEND_CARD_DATA_SUCCESS:
      return {...state, loading: false, response: {...payload}};
    case SEND_CARD_DATA_FAILURE:
      return {...state, loading: false, response: {}};
    case REFRESH_CARD_DATA:
      return {...initialState};
    case LOG_OUT:
      return {...initialState};
    default:
      return state;
  }
};
