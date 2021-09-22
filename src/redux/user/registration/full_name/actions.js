import axios from 'axios';
import {
  GET_FULL_NAME,
  GET_PHONE_NUMBER,
  SET_REGISTRATION_DATA_FAILURE,
  SET_REGISTRATION_DATA_START,
  SET_REGISTRATION_DATA_SUCCESS,
  REFRESH_REGISTRATION_DATA,
  SET_REGISTRATION_CONFIRM_PHONE_CODE_FAILURE,
  SET_REGISTRATION_CONFIRM_PHONE_CODE_START,
  SET_REGISTRATION_CONFIRM_PHONE_CODE_SUCCESS,
  REFRESH_CONFIRM_PHONE_DATA,
  REFRESH_REGISTRATION_PHONE_NUMBER_DATA,
  CREATE_PERSONAL_INFO
} from './constants';
import AsyncStorage from '@react-native-community/async-storage';
import {errorCatch} from '../../../error/actions';
import {
  CONFIRM_PHONE_REGISTRATION_USER_URL,
  REGISTRATION_USER_URL,
} from '../../../../routes/index';

export const sentData = data => async dispatch => {
  const date = data.dob.split('-')
  const sendData = {
    city: data.city,
    state:data.state,
    address:data.address,
    dob_day: date[1],
    dob_month: date[0],
    dob_year: date[2],
    ssn: data.ssn,
    zip: data.zip,
    username:data.username,
    lastName:data.lastName,
    firstName:data.firstName,
    phone:data.phone
  };
  try {
    dispatch(setRegistrationDataStart());
    const response = await axios.post(REGISTRATION_USER_URL, sendData);
    await AsyncStorage.setItem('reg_token', response.data.token);
    dispatch(setRegistrationDataSuccess(response));
  } catch (e) {
    if (e.response && e.response.data) {
      dispatch(errorCatch( {
        response: { data: { error: { message: e.response.data } } }
      }))
    } else {
      dispatch(errorCatch(e));
    }
    dispatch(setRegistrationDataFailure());
  }
};
export const confirmCode = code => async dispatch => {
  const data = {
    code: code,
  };
  dispatch(setConfirmCodeStart());
  try {
    const token = await AsyncStorage.getItem('reg_token');
    await axios.post(CONFIRM_PHONE_REGISTRATION_USER_URL, data, {
      headers: {Authorization: `Bearer ${token}`},
    });
    dispatch(setConfirmCodeSuccess({message: 'OK'}));
  } catch (e) {
    dispatch(errorCatch(e));
    dispatch(setConfirmCodeFailure());
  }
};

export const setFullNameData = data => ({
  type: GET_FULL_NAME,
  payload: data,
});

export const createPersonalInfo = data => ({
  type:CREATE_PERSONAL_INFO,
  payload: data,
});
export const setPhoneNumberData = data => ({
  type: GET_PHONE_NUMBER,
  payload: data,
});

export const refreshRegistrationData = () => ({
  type: REFRESH_REGISTRATION_DATA,
});

export const refreshPhoneNumberData = () => ({
  type: REFRESH_REGISTRATION_PHONE_NUMBER_DATA,
});

const setConfirmCodeStart = () => ({
  type: SET_REGISTRATION_CONFIRM_PHONE_CODE_START,
});

const setConfirmCodeSuccess = data => ({
  type: SET_REGISTRATION_CONFIRM_PHONE_CODE_SUCCESS,
  payload: data,
});

const setConfirmCodeFailure = () => ({
  type: SET_REGISTRATION_CONFIRM_PHONE_CODE_FAILURE,
});
export const refreshConfirmData = () => ({
  type: REFRESH_CONFIRM_PHONE_DATA,
});

const setRegistrationDataStart = () => ({
  type: SET_REGISTRATION_DATA_START,
});

const setRegistrationDataSuccess = data => ({
  type: SET_REGISTRATION_DATA_SUCCESS,
  payload: data.data,
});

const setRegistrationDataFailure = () => ({
  type: SET_REGISTRATION_DATA_FAILURE,
});
