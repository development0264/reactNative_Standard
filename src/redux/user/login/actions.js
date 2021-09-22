import axios from 'axios';
import {
  LOGIN_USER_DATA_FAILURE,
  LOGIN_USER_DATA_SUCCESS,
  LOGIN_USER_DATA_START,
  REFRESH_USER_DATA,
} from './constants';
import AsyncStorage from '@react-native-community/async-storage';
import {AUTH_LOGIN_URL} from '../../../routes/index';
import {errorCatch} from '../../error/actions';
export const loginUserData = data => async dispatch => {
  const login = {...data};
  login.phone = login.phone.replace(/[^+\d]/g, '');
  dispatch(loginUserDataStart());
  try {
    const response = await axios.post(AUTH_LOGIN_URL, login);
    await AsyncStorage.setItem('token', response.data.token);
    dispatch(loginUserDataSuccess({message: 'OK'}));
  } catch (e) {
    dispatch(errorCatch(e));
    dispatch(loginUserDataFailure());
  }
};
const loginUserDataStart = () => ({
  type: LOGIN_USER_DATA_START,
});

const loginUserDataSuccess = data => ({
  type: LOGIN_USER_DATA_SUCCESS,
  payload: data,
});

const loginUserDataFailure = () => ({
  type: LOGIN_USER_DATA_FAILURE,
});

export const refreshStateData = () => ({
  type: REFRESH_USER_DATA,
});
