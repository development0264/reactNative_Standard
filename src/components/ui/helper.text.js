import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Text} from 'react-native-elements';
import {main as styles} from '../../styles/main';

const HelperText = ({onPress, text}) => (
  <View style={styles.HelperText.container}>
    <TouchableOpacity onPress={onPress}>
      <Text h4>{text}</Text>
    </TouchableOpacity>
  </View>
);
export default HelperText;
