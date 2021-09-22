import React, {useEffect, useState} from 'react';
import HistoryItem from './history.item';
import Wrapper from '../../../ui/wrapper';
import {Text} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
import {transactionHistoryGet} from '../../../../store /user/transactions/history/actions';
import SplashScreen from '../../../spinner';
import {ScrollView, View} from 'react-native';
import _ from 'lodash';
import {colors} from '../../../../styles/colors';

import {store} from '../../../../store /store';
const {getState} = store;

const HistoryList = ({guid,navigation}) => {
  const dispatch = useDispatch(),
    {data, loading, apiFailure} = useSelector(r => r.TRANSACTION_HISTORY_DATA),
    [transactions, setTransactions] = useState([]),
    [loader, setLoader] = useState(true),
    renderText = () => (
      <Wrapper>
        <Text h3> History page is empty... </Text>
      </Wrapper>
    ),
    renderEmptyPage = array => {
      return _.isEmpty(array) ? {flex: 1} : null;
    };
  useEffect(() => {
    let user = getState().USER_INFO_DATA.data
    dispatch(transactionHistoryGet(user.csCardToken))
  }, []);

  useEffect(() => {
    if (!_.isEmpty(data)) {
      // perform reverse array
      let receiver_array = []
      let sender_array = []
      //Splitting receiver and sender transactions
      _.forEach(data, (trans) => {
        if (trans.type == "receiver") 
          receiver_array.push(trans)
        else
          sender_array.push(trans)
      })
      //performing reverse action
      let receiver_reversed = receiver_array.reverse();
      let sender_reversed = sender_array.reverse();
      //merging reversed array
      let child = receiver_reversed.concat(sender_reversed)
      setTransactions(child)
      setLoader(false)
    } else if (apiFailure){
      setLoader(false)
    }
  }, [data])

  return (
    <View style={{backgroundColor: colors.black, flex: 1}}>
      {loader && <SplashScreen />}
      {!loader && (
        <ScrollView contentContainerStyle={renderEmptyPage(transactions)}>
          {(!_.isEmpty(transactions) &&
            transactions.map(item => <HistoryItem navigation={navigation} item={item} key={item.id} />)) ||
            renderText()}
        </ScrollView>
      )}
    </View>
  );
};
export default HistoryList;
