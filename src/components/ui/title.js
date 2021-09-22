import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Text} from 'react-native-elements';
import {main} from '../../styles/main';
const style = main.Title;

const Title = ({title, text, onPress = null, line}) => (
  <View style={style.container}>
    <Text style={style.titleTextStyle}>{title}</Text>
    <TouchableOpacity onPress={onPress} disabled={onPress === null}>
      <Text style={[style.textStyle, {textDecorationLine: line || null}]}>
        {text}
      </Text>
    </TouchableOpacity>
  </View>
);
export default Title;
