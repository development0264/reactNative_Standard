import {FORGOT_RESENT_EMAIL_URL} from '../../../../../routes/index';
import axios from 'axios';
import {
  RESENT_EMAIL_CODE_FAILURE,
  RESENT_EMAIL_CODE_SUCCESS,
  RESENT_EMAIL_CODE_START,
  REFRESH_RESENT_EMAIL_CODE_DATA,
} from './constants';
import {errorCatch} from '../../../../error/actions';

export const resentEmailCodeData = email => dispatch => {
  const data = {
    email: email,
  };
  dispatch(resentEmailCodeStart());
  axios
    .post(FORGOT_RESENT_EMAIL_URL, data)
    .then(res => dispatch(resentEmailCodeSuccess({message: 'OK'})))
    .catch(e => {
      dispatch(errorCatch(e));
      dispatch(resentEmailCodeFailure());
    });
};

const resentEmailCodeStart = () => ({
  type: RESENT_EMAIL_CODE_START,
});
const resentEmailCodeSuccess = data => ({
  type: RESENT_EMAIL_CODE_SUCCESS,
  payload: data,
});
const resentEmailCodeFailure = () => ({
  type: RESENT_EMAIL_CODE_FAILURE,
});
export const refreshEmailCodeData = () => ({
  type: REFRESH_RESENT_EMAIL_CODE_DATA,
});
