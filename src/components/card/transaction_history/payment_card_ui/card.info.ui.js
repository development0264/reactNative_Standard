import React, {useState, useCallback} from 'react';
import {main} from '../../../../styles/main';
import {useDispatch, useSelector} from 'react-redux';
const style = main.CardsItemHistory;
import {ScrollView, RefreshControl, SafeAreaView} from 'react-native';
import {getCardInfoData} from '../../../../store /user/card/card_info/actions';
import {transactionHistoryGet} from '../../../../store /user/transactions/history/actions';
import CardImageView from './components/wrapper';
import IconView from './components/icon';
import CardNumberView from './components/card.number';
import BalanceCardView from './components/balance';
import ExpireCardView from './components/expire.date';
import SplashScreen from '../../../spinner'

import {store} from '../../../../store /store';
const {dispatch,getState} = store;

const CardsItemHistory = ({guid}) => {
  const {
      data :{brand,exp_month,exp_year=null,last4:number},
      loading
    } = useSelector(r => r.CARD_INFO_DATA),
    {cards} = useSelector(r => r.CARD_DATA),
    dispatch = useDispatch(),
    [refreshing, setRefreshing] = useState(false),
    onRefresh = useCallback(() => {
      setRefreshing(true);
      let user = getState().USER_INFO_DATA.data
      // dispatch(getCardInfoData(guid));
      dispatch(transactionHistoryGet(user.csCardToken));
      setTimeout(() => setRefreshing(false), 1000);
    }, [refreshing]);
     const date = String(exp_year);
     
  return (
    <SafeAreaView style={style.containerView}>
        {loading && <SplashScreen />}
        {!loading && (
          <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <CardImageView>
          <IconView type={brand}/>
          <CardNumberView cardNumber={cards[0] ? cards[0].last4Digits : "****"} />
          {
            cards[0] ? <ExpireCardView expiry={cards[0].expirationMonth +"/"+ cards[0].expirationYear} />
            : <ExpireCardView expiry={"00/00"} />
          }
          {/*<BalanceCardView balance={balance} />*/}
          {/* <ExpireCardView expiry={`${cards[0].expirationMonth} / ${cards[0].expirationYear}`} /> */}
        </CardImageView>
      </ScrollView>
        )}
    </SafeAreaView>
  );
};
export default CardsItemHistory;
