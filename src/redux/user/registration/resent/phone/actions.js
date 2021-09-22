import {FORGOT_RESENT_PHONE_URL} from '../../../../../routes/index';
import axios from 'axios';
import {
  RESENT_PHONE_NUMBER_FAILURE,
  RESENT_PHONE_NUMBER_SUCCESS,
  RESENT_PHONE_NUMBER_START,
  REFRESH_RESENT_PHONE_NUMBER_DATA,
} from './constants';
import {errorCatch} from '../../../../error/actions';

export const resentPhoneNumberData = phone => dispatch => {
  const transform = phone.replace(/[^+\d]/g, '');
  const data = {
    phone: transform,
  };
  dispatch(resentPhoneNumberStart());
  axios
    .post(FORGOT_RESENT_PHONE_URL, data)
    .then(res => dispatch(resentPhoneNumberSuccess({message: 'OK'})))
    .catch(e => {
      dispatch(errorCatch(e));
      dispatch(resentPhoneNumberFailure());
    });
};

const resentPhoneNumberStart = () => ({
  type: RESENT_PHONE_NUMBER_START,
});
const resentPhoneNumberSuccess = data => ({
  type: RESENT_PHONE_NUMBER_SUCCESS,
  payload: data,
});
const resentPhoneNumberFailure = () => ({
  type: RESENT_PHONE_NUMBER_FAILURE,
});
export const refreshResentPhoneNumberData = () => ({
  type: REFRESH_RESENT_PHONE_NUMBER_DATA,
});
