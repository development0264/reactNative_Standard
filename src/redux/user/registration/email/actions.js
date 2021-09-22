import axios from 'axios';
import {
  SET_REGISTRATION_EMAIL_START,
  SET_REGISTRATION_EMAIL_FAILURE,
  SET_REGISTRATION_EMAIL_SUCCESS,
  REFRESH_REGISTRATION_EMAIL,
  SET_REGISTRATION_CONFIRM_EMAIL_START,
  SET_REGISTRATION_CONFIRM_EMAIL_SUCCESS,
  SET_REGISTRATION_CONFIRM_EMAIL_FAILURE,
} from './constants';
import {
  REGISTRATION_USER_EMAIL_URL,
  CONFIRM_PHONE_REGISTRATION_EMAIL_URL,
} from '../../../../routes/index';
import AsyncStorage from '@react-native-community/async-storage';
import {errorCatch} from '../../../error/actions';

export const emailSentData = email => async dispatch => {
  const token = await AsyncStorage.getItem('reg_token');
  dispatch(registrationEmailDataStart());
  try {
    const response = await axios.post(REGISTRATION_USER_EMAIL_URL, email, {
      headers: {Authorization: `Bearer ${token}`},
    });
    dispatch(registrationEmailDataSuccess(response.data));
  } catch (e) {
    dispatch(errorCatch(e));
    dispatch(registrationEmailDataFailure());
  }
};
export const sentEmailConfirmCode = code => async dispatch => {
  const token = await AsyncStorage.getItem('reg_token');
  const data = {
    code: code,
  };
  dispatch(registrationEmailConfirmStart());
  try {
    await axios.post(CONFIRM_PHONE_REGISTRATION_EMAIL_URL, data, {
      headers: {Authorization: `Bearer ${token}`},
    });
    dispatch(registrationEmailConfirmSuccess({message: 'OK'}));
  } catch (e) {
    dispatch(errorCatch(e));
    dispatch(registrationEmailConfirmFailure());
  }
};

export const refreshRegistrationEmail = () => ({
  type: REFRESH_REGISTRATION_EMAIL,
});

const registrationEmailDataStart = () => ({
  type: SET_REGISTRATION_EMAIL_START,
});

const registrationEmailDataSuccess = data => ({
  type: SET_REGISTRATION_EMAIL_SUCCESS,
  payload: data,
});

const registrationEmailDataFailure = () => ({
  type: SET_REGISTRATION_EMAIL_FAILURE,
});

const registrationEmailConfirmStart = () => ({
  type: SET_REGISTRATION_CONFIRM_EMAIL_START,
});

const registrationEmailConfirmSuccess = data => ({
  type: SET_REGISTRATION_CONFIRM_EMAIL_SUCCESS,
  payload: data,
});

const registrationEmailConfirmFailure = () => ({
  type: SET_REGISTRATION_CONFIRM_EMAIL_FAILURE,
});
