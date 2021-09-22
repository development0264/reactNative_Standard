import React from 'react';
import {StyleSheet, View} from 'react-native';
import {main as styles} from '../../styles/main';

const Wrapper = props => (
  <View style={styles.ScreenWrapper.container}>{props.children}</View>
);
export default Wrapper;
