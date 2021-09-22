const initialState = {
  sum: '$3',
  obj: null,
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case 'SELECTED_FUNDS':
      return {...state, sum: payload};
    case 'GET_NFC':
      return {...state, obj: {...payload}};
    case 'CLEAR':
      return {...initialState};
    default:
      return state;
  }
};

export const selectedFunds = data => ({
  type: 'SELECTED_FUNDS',
  payload: data,
});
export const NfcBackground = data => ({
  type: 'GET_NFC',
  payload: data,
});
export const NfcBackgroundClear = () => ({
  type: 'CLEAR',
});
