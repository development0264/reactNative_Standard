import {
  TRANSACTION_HISTORY_START,
  TRANSACTION_HISTORY_SUCCESS,
  TRANSACTION_HISTORY_FAILURE,
  LOG_OUT,
} from './constants';

const initialState = {
  error: null,
  loading: false,
  apiFailure: false,
  data: [],
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case TRANSACTION_HISTORY_START:
      return {...state, loading: true};
    case TRANSACTION_HISTORY_SUCCESS:
      return {...state, loading: false, apiFailure: false, data: [...payload]};
    case TRANSACTION_HISTORY_FAILURE:
      return {...state, loading: false, data: [], apiFailure: true, error: {...payload}};
    case LOG_OUT:
      return {...initialState};
    default:
      return state;
  }
};
