import axios from 'axios';
import {
  TRANSACTION_HISTORY_START,
  TRANSACTION_HISTORY_SUCCESS,
  TRANSACTION_HISTORY_FAILURE,
} from './constants';
import {errorCatch} from '../../../error/actions';
import {TRANSACTION_SEND_URL,CROSS_RIVER_TOKEN_URL} from '../../../../routes';

export const transactionHistoryGet = csCardToken => dispatch => {
  dispatch(transactionHistoryStart());
  axios.post(CROSS_RIVER_TOKEN_URL, {
    "username":"ptpeBSTstgClient",
    "password":"d19c2e100865400f9849d903972218dc"
  }).then(tres => {
    if(tres.data.access_token) {
      axios.defaults.headers.common['Token'] = `${tres.data.access_token}`;
      axios
      .get(TRANSACTION_SEND_URL)
      .then(res =>{
        if (res.data && res.data.transactions) {
          dispatch(transactionHistorySuccess(res.data.transactions))
        } else {
          dispatch(transactionHistoryFailure([]));
        }
      })
      .catch(err => {
        dispatch(transactionHistoryFailure(err));
      });
    } else {
      dispatch(transactionHistoryFailure({}));
    }
  }).catch(err => {
    dispatch(errorCatch(err));
    dispatch(transactionHistoryFailure(err));
  })

};

const transactionHistoryStart = () => ({
  type: TRANSACTION_HISTORY_START,
});

const transactionHistorySuccess = data => ({
  type: TRANSACTION_HISTORY_SUCCESS,
  payload: data
});

const transactionHistoryFailure = error => ({
  type: TRANSACTION_HISTORY_FAILURE,
  payload: error,
});
