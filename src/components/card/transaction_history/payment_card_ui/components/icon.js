import React from 'react';
import {Image} from 'react-native';
import Icons from '../../../payment_card/payment_card_UI/Icons';
import {main} from '../../../../../styles/main';
const style = main.CardsItemHistory;

export default ({type}) => <Image style={[style.icon]} source={Icons[type]} />;
