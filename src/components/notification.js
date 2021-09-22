import React from 'react';
import {Text, View} from 'react-native';
import {main as styles} from '../styles/main';
import Proptypes from 'prop-types';
const Notification = ({title, message}) => (
  <View style={styles.Notification.container}>
    <Text style={styles.Notification.textStyle}>{title}</Text>
    <Text style={styles.Notification.textStyle}>{message}</Text>
  </View>
);
Notification.prototype = {
  title: Proptypes.string,
  message: Proptypes.string,
};
export default Notification;
