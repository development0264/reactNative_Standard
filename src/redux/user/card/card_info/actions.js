import axios from 'axios';
import {
  GET_CARD_INFO_DATA_FAILURE,
  GET_CARD_INFO_DATA_START,
  GET_CARD_INFO_DATA_SUCCESS,
} from './constants';
import {GET_CARD_INF0_URL} from '../../../../routes';
import {errorCatch} from '../../../error/actions';

export const getCardInfoData = guid => dispatch => {
  dispatch(getCardInfoDataStart());
  axios
    .get(GET_CARD_INF0_URL)
    .then(res => dispatch(getCardInfoDataSuccess(res.data)))
    .catch(err => {
      dispatch(getCardInfoDataFailure(err));
      dispatch(errorCatch(err));
    });
};
const getCardInfoDataStart = () => ({
  type: GET_CARD_INFO_DATA_START,
});
const getCardInfoDataSuccess = data => ({
  type: GET_CARD_INFO_DATA_SUCCESS,
  payload: data,
});
const getCardInfoDataFailure = err => ({
  type: GET_CARD_INFO_DATA_FAILURE,
  payload: err,
});
