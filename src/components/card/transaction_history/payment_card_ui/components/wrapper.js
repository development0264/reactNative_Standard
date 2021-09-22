import React from 'react';
import {ImageBackground, View} from 'react-native';
const cardImage = require('../../../../../assets/payment_card/card_front.png');
import {main} from '../../../../../styles/main.js';
const style = main.CardsItemHistory;

export default ({children}) => (
  <View style={{padding: 15}}>
    <ImageBackground source={cardImage} style={style.imageStyle}>
      {children}
    </ImageBackground>
  </View>
);
