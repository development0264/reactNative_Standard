import {REFRESH_ERROR_STATE, ERROR_CACHES} from './constants';

const initialState = {
  error: null,
  flag: false,
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case ERROR_CACHES:
      if (payload.error) {
        return {...state, error: {...payload.error}, flag: true};
      }
      return {...state, error: {...payload}, flag: true};
    case REFRESH_ERROR_STATE:
      return {...initialState};
    default:
      return state;
  }
};