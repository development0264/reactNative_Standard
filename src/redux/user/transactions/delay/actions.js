import {
  TRANSACTION_DELAY_START,
  TRANSACTION_DELAY_FAILURE,
  TRANSACTION_DELAY_SUCCESS,
  TRANSACTION_DELAY_CLEAR,
} from './constants';
import axios from 'axios';
import {TRANSACTION_DELAY_URL,CROSS_RIVER_TOKEN_URL} from '../../../../routes';
import {errorCatch} from '../../../error/actions';

export const transactionDelay = data => dispatch => {
  dispatch(transactionDelayStart());
  axios.post(CROSS_RIVER_TOKEN_URL, {
    "username":"ptpeBSTstgClient",
    "password":"d19c2e100865400f9849d903972218dc"
  }).then(tres => {
    if(tres.data.access_token) {
      axios.defaults.headers.common['Token'] = `${tres.data.access_token}`;
      axios
        .post(TRANSACTION_DELAY_URL, data)
        .then(res => {
          if (res.data["Error status"] && res.data["Error status"] == 400) {
            dispatch(errorCatch( {
              response: { data: { error: { message: res.data["Error message"] } } }
            }))
          } else {
            dispatch(transactionDelaySuccess(res.data.transactionCode))
          }
        })
        .catch(err => {
          dispatch(errorCatch(err));
          dispatch(transactionDelayFailure());
        });
    } else {
        dispatch(transactionDelayFailure());
    }
  })
  .catch(err => {
    dispatch(errorCatch(err));
    dispatch(transactionDelayFailure(err));
  });
};
const transactionDelayStart = () => ({
  type: TRANSACTION_DELAY_START,
});
const transactionDelaySuccess = data => ({
  type: TRANSACTION_DELAY_SUCCESS,
  payload: data,
});
const transactionDelayFailure = () => ({
  type: TRANSACTION_DELAY_FAILURE,
});
export const transactionDelayClear = () => ({
  type: TRANSACTION_DELAY_CLEAR,
});
