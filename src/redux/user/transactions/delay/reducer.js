import {
  TRANSACTION_DELAY_START,
  TRANSACTION_DELAY_FAILURE,
  TRANSACTION_DELAY_SUCCESS,
  TRANSACTION_DELAY_CLEAR,
} from './constants';
const initialState = {
  loading: false,
  transactionCode: null,
};
export default (state = initialState, {type, payload}) => {
  switch (type) {
    case TRANSACTION_DELAY_START:
      return {...state, loading: true};
    case TRANSACTION_DELAY_SUCCESS:
      return {...state, loading: false, transactionCode: payload};
    case TRANSACTION_DELAY_FAILURE:
      return {...state, loading: false};
    case TRANSACTION_DELAY_CLEAR:
      return {...initialState};
    default:
      return state;
  }
};
