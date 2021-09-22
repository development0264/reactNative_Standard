import axios from 'axios';
import {
  SEND_CARD_DATA_FAILURE,
  SEND_CARD_DATA_START,
  SEND_CARD_DATA_SUCCESS,
  REFRESH_CARD_DATA,
} from './constans';
import {SEND_CARD_DATA_URL,CROSS_RIVER_TOKEN_URL,REGISTER_CARD_INTERNALLY} from '../../../../routes/index';
import {errorCatch} from '../../../error/actions';
import {Alert} from 'react-native'

export const addCardData = data => dispatch => {
  dispatch(addCardDataStart());
  axios.post(CROSS_RIVER_TOKEN_URL, {
    "username":"ptpeBSTstgClient",
    "password":"d19c2e100865400f9849d903972218dc"
  }).then(tres => {
    if(tres.data.access_token) {
      axios.defaults.headers.common['Token'] = `${tres.data.access_token}`;
      axios
      .post(SEND_CARD_DATA_URL, data)
      .then(res => {
        if (res.data && res.data.result) {
          axios
          .put(REGISTER_CARD_INTERNALLY, { id: data.id, csCardToken: res.data.result.cardToken})
          .then(rres => {
            dispatch(addCardDataSuccess(res))
          }).catch(e => {
            dispatch(addCardDataFailure());
          });
        } else {
          if (res.data && res.data["Error message"]) {
            Alert.alert('Sorry', res.data["Error message"])
          } else {
            Alert.alert('Sorry','Unable to add your card. Please Try again')
          }
          dispatch(addCardDataFailure());
        }
      })
      .catch(e => {
        Alert.alert('Sorry','Unable to add your card. Please Try again')
        dispatch(addCardDataFailure());
        dispatch(errorCatch(e));
      });
    }
  })
  .catch(e => {
    Alert.alert('Sorry','Unable to add your card. Please Try again')
    dispatch(addCardDataFailure());
    dispatch(errorCatch(e));
  });
};

const addCardDataStart = () => ({
  type: SEND_CARD_DATA_START,
});
const addCardDataSuccess = data => ({
  type: SEND_CARD_DATA_SUCCESS,
  payload: data,
});
const addCardDataFailure = () => ({
  type: SEND_CARD_DATA_FAILURE,
});
export const refreshData = () => ({
  type: REFRESH_CARD_DATA,
});
