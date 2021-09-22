//LOGIN
export const AUTH_LOGIN_URL = '/auth/login';
//REGISTRATION-STEPS
export const REGISTRATION_USER_URL = 'auth/register/user';
export const REGISTRATION_USER_PASSWORD_URL = '/auth/register/password';
export const REGISTRATION_USER_EMAIL_URL = '/auth/register/email';
export const ANONYMOUS_TYPE_URL = '/auth/register/anon';
export const CONFIRM_PHONE_REGISTRATION_USER_URL = '/confirm/phone';
export const CONFIRM_PHONE_REGISTRATION_EMAIL_URL = '/confirm/email';
//RESENT CODE ON  EMAIL /PHONE
export const FORGOT_RESENT_PHONE_URL = '/forgot/resend/phone';
export const FORGOT_RESENT_EMAIL_URL = '/forgot/resend/email';
//FORGOT-PASSWORD
export const PASSWORD_RESTORE_CREATE_URL = '/forgot/restore/phone';
export const PASSWORD_RESTORE_CONFIRM_URL = '/forgot/restore/phone/confirm';
export const CHANGE_PASSWORD_CREATE_URL = '/forgot/change/password';
//USER-INFO
export const GET_USER_INFO_URL = '/user/profile';
//ADD CARD
export const SEND_CARD_DATA_URL = '/crossriver/cardRegister';
//CARD-INFO
export const GET_CARD_INF0_URL = '/cards';
//CARDS-INFO
export const GET_CARDS_INFO_URL = '/crossriver/cardDetails';
//DELETE-CARD
export const DELETE_CARD_URL = '/cards';
//SEND MONEY
export const TRANSACTION_SEND_URL = '/transactions';
//CROSS RIVER SEND TRANSACTION 
export const CROSS_RIVER_TRANSACTION = '/crossriver/transaction'
//TRANSACTION ID DETAILS
export const TRANSACTION_ID_URL = '/crossriver/pulltransactionId';
//DELAY WHEN USER ADONT HAVE APP
export const TRANSACTION_DELAY_URL = '/transaction/delay';
//Cross river token
export const CROSS_RIVER_TOKEN_URL = '/crossriver/token'
//REGISTER CARD INTERNALLY
export const REGISTER_CARD_INTERNALLY = '/crossriver/insertCardToken' 