import React from 'react';
import {Text} from 'react-native';
import moment from 'moment';
import {main} from '../../../../../styles/main';
const style = main.CardsItemHistory;

export default ({expiry}) => (
  <>
    <Text style={[style.baseText, style.expiryLabel]}>MONTH/YEAR</Text>
    <Text style={[style.baseText, style.expiry]}>
      {expiry}
    </Text>
  </>
);
