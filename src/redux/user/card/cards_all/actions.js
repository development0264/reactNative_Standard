import axios from 'axios';
import {GET_CARDS_INFO_URL,CROSS_RIVER_TOKEN_URL} from '../../../../routes';
import {
  GET_CARDS_DATA_START,
  GET_CARDS_DATA_SUCCESS,
  GET_CARDS_DATA_FAILURE,
} from './contants';
import {errorCatch} from '../../../error/actions';
export const getCardsData = (csCardToken) => dispatch => {
  dispatch(getCardsDataStart());
  axios.post(CROSS_RIVER_TOKEN_URL, {
    "username":"ptpeBSTstgClient",
    "password":"d19c2e100865400f9849d903972218dc"
  }).then(tres => {
    if(tres.data.access_token) {
      axios.defaults.headers.common['Token'] = `${tres.data.access_token}`;
      axios
      .get(GET_CARDS_INFO_URL+"/"+csCardToken)
      .then(res => {
        if (res.data.name && res.data.name.toLowerCase() == "error") {
          dispatch(getCardsDataFailure({}));
        } else {
          dispatch(getCardsDataSuccess(res.data.result))
        }
      })
      .catch(err => {
        dispatch(errorCatch(err));
        dispatch(getCardsDataFailure(err));
      });
    } else {
      dispatch(getCardsDataFailure({}));
    }
  }).catch(err => {
    dispatch(errorCatch(err));
    dispatch(getCardsDataFailure(err));
  })
  
};

const getCardsDataStart = () => ({
  type: GET_CARDS_DATA_START,
});
const getCardsDataSuccess = data => ({
  type: GET_CARDS_DATA_SUCCESS,
  payload: data,
});
const getCardsDataFailure = error => ({
  type: GET_CARDS_DATA_FAILURE,
  payload: error,
});
