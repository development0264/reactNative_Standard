import React, {useEffect, useRef} from 'react';
import MainHeader from '../../../components /ui/header';
import UserPaymentCard from './card.add';
import {useDispatch, useSelector} from 'react-redux';
import CardsList from '../../../components /card/cards_list/cards.list';
import _ from 'lodash';
import SplashScreen from '../../../components /spinner';
import {View} from 'react-native';
import DropdownAlert from 'react-native-dropdownalert';
import {getCardsData} from '../../../store /user/card/cards_all/actions';

import {store} from '../../../store /store';
const {dispatch,getState} = store;
/**
 * Dashboard of cards_all or if user doesnt not have cards_all he can add one
 * @returns {*}
 * @constructor
 */
const CardsWrapper = ({navigation}) => {
  const {cards, loading} = useSelector(r => r.CARD_DATA),
    dispatch = useDispatch(),
    alertRef = useRef(),
    renderCard = () =>
      !_.isEmpty(cards[0]) ? (
        <CardsList cards={cards} navigation={navigation} alertRef={alertRef} />
      ) : (
        <UserPaymentCard alertRef={alertRef} />
      );
  useEffect(() => {
    let user = getState().USER_INFO_DATA.data
    dispatch(getCardsData(user.csCardToken));
  },[]);

  return (
    <>
      <View style={{backgroundColor: 'white', flex: 1}}>
        <MainHeader title="Cards" />
        {loading ? <SplashScreen /> : renderCard()}
      </View>
      <DropdownAlert ref={alertRef} />
    </>
  );
};
export default CardsWrapper;
