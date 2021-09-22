import axios from 'axios';
import {
  GET_USER_INFO_START,
  GET_USER_INFO_SUCCESS,
  GET_USER_INFO_FAILURE,
  UPDATE_USER_INFO_START,
  UPDATE_USER_INFO_FAILURE,
  UPDATE_USER_INFO_SUCCESS,
  REFRESH_UPDATE_MESSAGE,
} from './constants';
import {GET_USER_INFO_URL} from '../../../routes/index';
import {errorCatch} from '../../error/actions';
import {getCardsData} from '../card/cards_all/actions';

export const getUserInfo = () => dispatch => {
  dispatch(getUserInfoStart());
  axios
    .get(GET_USER_INFO_URL)
    .then(res => {
      dispatch(getUserInfoSuccess(res.data))
    })
    .catch(e => {
      dispatch(errorCatch(e));
      dispatch(getUserInfoFailure());
    });
};
export const updateUserDetails = () => dispatch => {
  dispatch(getUserInfoStart());
  axios
    .get(GET_USER_INFO_URL)
    .then(res => {
      dispatch(getUserInfoSuccess(res.data))
      dispatch(getCardsData(res.data.csCardToken))
    })
    .catch(e => {
      dispatch(errorCatch(e));
      dispatch(getUserInfoFailure());
    });
};
export const updateUserData = data => dispatch => {
  dispatch(updateUserDataStart());
  axios
    .put(GET_USER_INFO_URL, data)
    .then(res => dispatch(updateUserDataSuccess(res.data)))
    .catch(e => {
      dispatch(errorCatch(e));
      dispatch(updateUserDataError());
    });
};

const getUserInfoStart = () => ({
  type: GET_USER_INFO_START,
});
const getUserInfoSuccess = data => ({
  type: GET_USER_INFO_SUCCESS,
  payload: data,
});
const getUserInfoFailure = () => ({
  type: GET_USER_INFO_FAILURE,
});

const updateUserDataStart = () => ({
  type: UPDATE_USER_INFO_START,
});
const updateUserDataSuccess = data => ({
  type: UPDATE_USER_INFO_SUCCESS,
  payload: data,
});
const updateUserDataError = () => ({
  type: UPDATE_USER_INFO_FAILURE,
});
export const refreshUpdateMessage = () => ({
  type: REFRESH_UPDATE_MESSAGE,
});
