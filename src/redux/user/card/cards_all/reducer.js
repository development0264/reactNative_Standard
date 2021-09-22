import {
  GET_CARDS_DATA_START,
  GET_CARDS_DATA_SUCCESS,
  GET_CARDS_DATA_FAILURE,
} from './contants';
const initialState = {
  cards: [],
  loading: false,
};
export default (state = initialState, {type, payload}) => {
  switch (type) {
    case GET_CARDS_DATA_START:
      return {...state, loading: true};
    case GET_CARDS_DATA_SUCCESS:
      return {...state, loading: false, cards: [{...payload}] };
    case GET_CARDS_DATA_FAILURE:
      return {...state, loading: false};
    default:
      return state;
  }
};