import LOGIN_DATA from './user/login/reducer';
import REGISTRATION_DATA from './user/registration/full_name/reducer';
import PASSWORD_DATA from './user/registration/password/reducer';
import RESTORE_DATA from './user/registration/forgot/password/reducer';
import EMAIL_DATA from './user/registration/email/reducer';
import RESENT_PHONE_NUMBER_DATA from '../store /user/registration/resent/phone/reducer';
import RESENT_EMAIL_CODE_DATA from '../store /user/registration/resent/email/reducer';
import USER_INFO_DATA from './user/user_data/reducer';
import SEND_CARD_DATA from '../store /user/card/add/reducer';
import {combineReducers} from "redux";
import SELECTED_FUNDS_DATA from '../store /user/card/select_funds/data';
import ERROR_CATCH_DATA from '../store /error/reducer'
import CARD_DATA from './user/card/cards_all/reducer';
import CARD_INFO_DATA from '../store /user/card/card_info/reducer';
import TRANSACTION_DATA from './user/transactions/reducer';
import TRANSACTION_HISTORY_DATA from './user/transactions/history/reducer'
import DELETE_CARD_DATA from '../store /user/card/delete/reducer'
import TRANSACTION_DELAY_DATA from './user/transactions/delay/reducer'
export const rootReducer = combineReducers({
  LOGIN_DATA,
  REGISTRATION_DATA,
  PASSWORD_DATA,
  RESTORE_DATA,
  EMAIL_DATA,
  RESENT_PHONE_NUMBER_DATA,
  RESENT_EMAIL_CODE_DATA,
  USER_INFO_DATA,
  SEND_CARD_DATA,
  SELECTED_FUNDS_DATA,
  ERROR_CATCH_DATA,
  CARD_DATA,
  CARD_INFO_DATA,
  TRANSACTION_DATA,
  TRANSACTION_HISTORY_DATA,
  DELETE_CARD_DATA,
  TRANSACTION_DELAY_DATA
});
