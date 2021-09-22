import React, {useEffect} from 'react';
import MainHeader from '../../../components /ui/header';
import HistoryScreenCardUI from '../../../components /card/transaction_history/payment_card_ui/card.info.ui';
import HistoryList from '../../../components /card/transaction_history/transactions_logs/history.list';
import {getCardInfoData} from '../../../store /user/card/card_info/actions';
import {useDispatch} from 'react-redux';
import {transactionHistoryGet} from '../../../store /user/transactions/history/actions';

import {store} from '../../../store /store';
const {dispatch,getState} = store;

const CardsHistory = ({
  route: {
    params: {guid},
  },
  navigation
}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch(getCardInfoData(guid));
    let user = getState().USER_INFO_DATA.data
    dispatch(transactionHistoryGet(user.csCardToken))
  });
  return (
    <>
      <MainHeader title="History" />
      <HistoryScreenCardUI guid={guid} />
      <HistoryList navigation={navigation} guid={guid} />
    </>
  );
};
export default CardsHistory;
