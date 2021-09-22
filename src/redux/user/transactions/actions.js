import axios from 'axios';
import {
  TRANSACTION_INIT_FAILURE,
  TRANSACTION_INIT_START,
  TRANSACTION_INIT_SUCCESS,
  TRANSACTION_INIT_REFRESH,
} from './constants';
import {errorCatch} from '../../error/actions';
import {CROSS_RIVER_TRANSACTION,CROSS_RIVER_TOKEN_URL} from '../../../routes';
import {Alert} from "react-native";

export const transactionSend = data => dispatch => {
  dispatch(transactionInitStart());
  axios.post(CROSS_RIVER_TOKEN_URL, {
    "username":"ptpeBSTstgClient",
    "password":"d19c2e100865400f9849d903972218dc"
  }).then(tres => {
    if(tres.data.access_token) {
      axios.defaults.headers.common['Token'] = `${tres.data.access_token}`;
      axios
      .post(CROSS_RIVER_TRANSACTION, data)
      .then(res =>{ 
        if (res.data["Error status"] && res.data["Error status"] == 400) {
          dispatch(errorCatch( {
            response: { data: { error: { message: res.data["Error message"] } } }
          }))
        } else {
          Alert.alert(`You bestowed $${Number(data.amount)/100}`); 
          dispatch(transactionInitSuccess(res.data))
        }
      })
      .catch(err => {
        dispatch(errorCatch(err));
        dispatch(transactionInitFailure(err));
      });
    } else {
      dispatch(transactionInitFailure());
    }
  })
  .catch(err => {
    dispatch(errorCatch(err));
    dispatch(transactionInitFailure(err));
  });
  
};

const transactionInitStart = () => ({
  type: TRANSACTION_INIT_START,
});

const transactionInitSuccess = data => ({
  type: TRANSACTION_INIT_SUCCESS,
  payload: data
});

const transactionInitFailure = error => ({
  type: TRANSACTION_INIT_FAILURE,
  payload: error,
});
export const transactionInitRefresh = () => ({
  type: TRANSACTION_INIT_REFRESH,
});
