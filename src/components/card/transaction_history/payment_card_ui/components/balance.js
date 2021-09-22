import React from 'react';
import {Text} from 'react-native';
import {convert} from '../../../../../utils/payment_card.util';
import {main} from '../../../../../styles/main';

const style = main.CardsItemHistory;

export default ({balance}) => (
  <Text style={[style.baseText, style.name]}>{`${convert(balance) || 0}`}</Text>
);
