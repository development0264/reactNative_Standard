import axios from 'axios';
import {
  SET_REGISTRATION_PASSWORDS_START,
  SET_REGISTRATION_PASSWORDS_FAILURE,
  SET_REGISTRATION_PASSWORDS_SUCCESS,
  SET_ANONYMOUS_TYPE_START,
  SET_ANONYMOUS_TYPE_SUCCESS,
  SET_ANONYMOUS_TYPE_FAILURE,
} from './constants';
import AsyncStorage from '@react-native-community/async-storage';
import {
  ANONYMOUS_TYPE_URL,
  REGISTRATION_USER_PASSWORD_URL,
} from '../../../../routes/index';
import {errorCatch} from '../../../error/actions';

export const sentPasswordsData = data => async dispatch => {
  const token = await AsyncStorage.getItem('reg_token');
  dispatch(setRegistrationPasswordsStart());
  axios
    .post(REGISTRATION_USER_PASSWORD_URL, data, {
      headers: {Authorization: `Bearer ${token}`},
    })
    .then(res => dispatch(setRegistrationPasswordsSuccess({message: 'OK'})))
    .catch(e => {
      dispatch(errorCatch(e));
      dispatch(setRegistrationPasswordsFailure());
    });
};
export const sentAnonTypeData = anonType => async dispatch => {
  const token = await AsyncStorage.getItem('reg_token');
  const data = {
    anonType: anonType,
  };
  dispatch(setAnonymousDataStart());
  axios
    .post(ANONYMOUS_TYPE_URL, data, {
      headers: {Authorization: `Bearer ${token}`},
    })
    .then(res => dispatch(setAnonymousDataSuccess({message: 'OK'})))
    .catch(e => {
      dispatch(errorCatch(e));
      dispatch(setAnonymousDataFailure());
    });
};

const setRegistrationPasswordsStart = () => ({
  type: SET_REGISTRATION_PASSWORDS_START,
});

const setRegistrationPasswordsSuccess = data => ({
  type: SET_REGISTRATION_PASSWORDS_SUCCESS,
  payload: data,
});

const setRegistrationPasswordsFailure = () => ({
  type: SET_REGISTRATION_PASSWORDS_FAILURE,
});

const setAnonymousDataStart = () => ({
  type: SET_ANONYMOUS_TYPE_START,
});

const setAnonymousDataSuccess = data => ({
  type: SET_ANONYMOUS_TYPE_SUCCESS,
  payload: data,
});

const setAnonymousDataFailure = () => ({
  type: SET_ANONYMOUS_TYPE_FAILURE,
});
