import React, {useEffect} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import {ListItem,Icon} from 'react-native-elements';
import {dashBoardNavigator as navigator} from '../../../navigation/screen.names';
import {Font} from '../../../config/data';
import {renderLastFour} from '../../../utils/payment_card.util';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Swipeout from 'react-native-swipeout';
import {colors} from '../../../styles/colors';
import {Alert} from 'react-native';
import {
  clearDeleteData,
  deleteCard,
} from '../../../store /user/card/delete/actions';
import {useDispatch, useSelector} from 'react-redux';
import {getUserInfo} from '../../../store /user/user_data/actions';
import {visa_logo} from '../../../config/images';
import ImageLoader from  './card.image.loader';

import {store} from '../../../store /store';
const {dispatch,getState} = store;

const CardsListItem = ({card, navigation, alertRef}) => {
    const {data, loading} = useSelector(r => r.DELETE_CARD_DATA),
    {user} = useSelector(r => r.USER_INFO_DATA.data),
    dispatch = useDispatch(),
    button = [
      {
        onPress: () =>
          Alert.alert('Delete Card', 'Are you sure you want to delete card?', [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
            },
            {text: 'Yes', onPress: () => {
              let userInfo = getState().USER_INFO_DATA.data
              dispatch(deleteCard(userInfo.id))
            }},
          ]),
        backgroundColor:colors.white,
        component: <MaterialCommunityIcons style={{ paddingLeft: wp('4%'), paddingTop: wp('8%')}} name='archive' type='font-awesome' color={colors.red} size={32} />,
        type:'delete',
        underlayColor:colors.white
      },
    ];
  useEffect(() => {
    if (data.message === 'OK') {
      dispatch(getUserInfo());
      dispatch(clearDeleteData());
      alertRef.current.alertWithType(
        'success',
        'Success',
        'Your card  was deleted!',
      );
    }
  }, [loading]);
  return (
    <Swipeout right={button}>
      <ListItem
        onPress={() => navigation.navigate(navigator.History, {guid: card.stripe_token})}
        leftAvatar={
          <ImageLoader source={visa_logo} />
        }
        titleStyle={styles.ListItem.titleStyle}
        subtitleStyle={styles.ListItem.titleStyle}
        subtitle={card.brand && card.brand}
        // title={renderLastFour(card.last4Digits)}
        title={`**** **** **** ${card.last4Digits}`}
        rightIcon={
          <MaterialCommunityIcons name="chevron-right" color="black" size={32} />
        }
        bottomDivider
      />
    </Swipeout>
  );
};
const styles = {
  ListItem: {
    titleStyle: {
      fontFamily: Font.Helvetica,
      fontSize: wp('5%'),
    },
  },
};
export default CardsListItem;
