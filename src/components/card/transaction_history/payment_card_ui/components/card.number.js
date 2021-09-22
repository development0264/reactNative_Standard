import React from 'react';
import {Text} from 'react-native';
import {cardNumberView} from '../../../../../utils/payment_card.util';
import {main} from '../../../../../styles/main';
const style = main.CardsItemHistory;

export default ({cardNumber}) => (
  <Text style={[style.baseText, style.number]}>
    {`${`**** **** **** ${cardNumber}` || ''}`}
  </Text>
);
