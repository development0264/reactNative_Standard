import {DELETE_CARD_URL,REGISTER_CARD_INTERNALLY} from '../../../../routes';
import {
  CLEAR_DELETE_CARD_DATA,
  DELETE_CARD_START,
  DELETE_CARD_SUCCESS,
} from './constants';
import axios from 'axios';
import {errorCatch} from '../../../error/actions';

export const deleteCard = id => dispatch => {
  dispatch(deleteCardStart());
  axios
    .put(REGISTER_CARD_INTERNALLY, { id, csCardToken: null})
    .then(res => {
      dispatch(deleteCardSuccess({message: 'OK'}))
    }).catch(err => {
      dispatch(errorCatch(err));
    });
};

const deleteCardStart = () => ({
  type: DELETE_CARD_START,
});
const deleteCardSuccess = data => ({
  type: DELETE_CARD_SUCCESS,
  payload: data,
});
export const clearDeleteData = () => ({
  type: CLEAR_DELETE_CARD_DATA,
});
