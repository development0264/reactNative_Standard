import {
  DELETE_CARD_START,
  DELETE_CARD_SUCCESS,
  CLEAR_DELETE_CARD_DATA,
} from './constants';
const initialState = {
  loading: false,
  data: {},
};
export default (state = initialState, {type, payload}) => {
  switch (type) {
    case DELETE_CARD_START:
      return {...state, loading: true};
    case DELETE_CARD_SUCCESS:
      return {...state, loading: false, data: {...payload}};
    case CLEAR_DELETE_CARD_DATA:
      return {...initialState};
    default:
      return state;
  }
};
