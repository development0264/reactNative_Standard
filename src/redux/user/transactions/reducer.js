import {
  LOG_OUT,
  TRANSACTION_INIT_FAILURE,
  TRANSACTION_INIT_REFRESH,
  TRANSACTION_INIT_START,
  TRANSACTION_INIT_SUCCESS,
} from './constants';
const initialState = {
  data: {},
  loading: false,
  error: null,
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case TRANSACTION_INIT_START:
      return {...state, loading: true};
    case TRANSACTION_INIT_SUCCESS:
      return {...state, loading: false, data: {...payload}};
    case TRANSACTION_INIT_FAILURE:
      return {...state, loading: false, error: {...payload}};
    case LOG_OUT:
      return {...initialState};
    case TRANSACTION_INIT_REFRESH:
      return {...initialState};
    default:
      return state;
  }
};
