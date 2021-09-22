import React from 'react';
import {ListItem} from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import moment from 'moment';
import {convert} from '../../../../utils/payment_card.util';
import {Font} from '../../../../config/data';
import {data, statuses, icons} from '../../../../config/transactios.types';
import {dashBoardNavigator as navigator} from '../../../../navigation/screen.names';

const HistoryItem = ({item, navigation}) => {
  const {amount,createdAt,type, status} = item;
  return (
    <ListItem
      leftAvatar={
        <MaterialCommunityIcons name="credit-card" size={25} color="grey" />
      }
      titleStyle={{
        fontFamily: Font.Helvetica,
        fontSize: 25,
        color: data[type],
      }}
      title={`${statuses[type] !== undefined ? statuses[type] : ""} $${convert(amount)/100}`}
      subtitleStyle={{fontFamily: Font.Helvetica}}
      subtitle={moment(createdAt).utc().local().format('MMMM DD YYYY, h:mm:ss a')}
      rightIcon={
        <MaterialCommunityIcons
          name={icons[type]}
          color={data[type]}
          size={22}
        />
      }
      onPress={()=> {
        if (item.transactionId && item.transactionId !== null) {
          navigation.navigate(navigator.TransactionDetails, {item, transacId: item.transactionId})
        }
      }}
    />
  );
};
export default HistoryItem;
