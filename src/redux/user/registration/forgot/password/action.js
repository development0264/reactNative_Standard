import axios from 'axios';
import {
  SET_RESTORE_PASSWORD_START,
  SET_RESTORE_PASSWORD_SUCCESS,
  SET_RESTORE_PASSWORD_FAILURE,
  SET_RESTORE_DATA_START,
  SET_RESTORE_DATA_SUCCESS,
  SET_RESTORE_DATA_FAILURE,
  RESET_RESTORE_PASSWORD,
  SET_RESTORE_PASSWORD_CREATE_START,
  SET_RESTORE_PASSWORD_CREATE_SUCCESS,
  SET_RESTORE_PASSWORD_CREATE_FAILURE,
} from './constants';
import AsyncStorage from '@react-native-community/async-storage';
import {
  CHANGE_PASSWORD_CREATE_URL,
  PASSWORD_RESTORE_CONFIRM_URL,
  PASSWORD_RESTORE_CREATE_URL,
} from '../../../../../routes';
import {errorCatch} from '../../../../error/actions';

export const restorePasswordSent = phone => dispatch => {
  const transform = phone.replace(/[^+\d]/g, '');
  const data = {
    phone: transform,
  };
  dispatch(restorePasswordDataStart());
  axios
    .post(PASSWORD_RESTORE_CREATE_URL, data)
    .then(response => dispatch(restorePasswordDataSuccess(response.data)))
    .catch(e => {
      dispatch(errorCatch(e));
      dispatch(restorePasswordDataFailure());
    });
};
export const senConfirmData = data => async dispatch => {
  dispatch(restoreDataSentStart());
  try {
    const res = await axios.post(PASSWORD_RESTORE_CONFIRM_URL, data);
    await AsyncStorage.setItem('restore_token', res.data.token);
    dispatch(restoreDataSentSuccess(res.data));
  } catch (e) {
    dispatch(errorCatch(e));
    dispatch(restoreDataSentFailure());
  }
};
export const sentCreatePasswordData = data => async dispatch => {
  const token = await AsyncStorage.getItem('restore_token');
  dispatch(restorePasswordCreateStart());
  try {
    await axios.post(CHANGE_PASSWORD_CREATE_URL, data, {
      headers: {Authorization: `Bearer ${token}`},
    });
    dispatch(restorePasswordCreateSuccess({message: 'OK'}));
  } catch (e) {
    dispatch(errorCatch(e));
    dispatch(restorePasswordCreateFailure());
  }
};

export const resetPasswordData = () => ({
  type: RESET_RESTORE_PASSWORD,
});

const restoreDataSentStart = () => ({
  type: SET_RESTORE_DATA_START,
});

const restoreDataSentSuccess = data => ({
  type: SET_RESTORE_DATA_SUCCESS,
  payload: data,
});

const restoreDataSentFailure = () => ({
  type: SET_RESTORE_DATA_FAILURE,
});

const restorePasswordDataStart = () => ({
  type: SET_RESTORE_PASSWORD_START,
});

const restorePasswordDataSuccess = data => ({
  type: SET_RESTORE_PASSWORD_SUCCESS,
  payload: data,
});

const restorePasswordDataFailure = () => ({
  type: SET_RESTORE_PASSWORD_FAILURE,
});

const restorePasswordCreateStart = () => ({
  type: SET_RESTORE_PASSWORD_CREATE_START,
});

const restorePasswordCreateSuccess = data => ({
  type: SET_RESTORE_PASSWORD_CREATE_SUCCESS,
  payload: data,
});

const restorePasswordCreateFailure = () => ({
  type: SET_RESTORE_PASSWORD_CREATE_FAILURE,
});
