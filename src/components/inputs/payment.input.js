import React from 'react';
import {TextInput, View ,Platform} from 'react-native';
import {Text} from 'react-native-elements';
import {Font} from '../../config/data';
import {main, main as styles} from '../../styles/main';
const style = main.cardStyle;

export default ({errors, touched, title, ...props}) => (
  <View style={[style.mix.container,Platform.OS==='ios' && {paddingTop:10}]}>
    <Text style={style.mix.textStyle}>{title}</Text>
    <TextInput
      {...props}
      style={[{fontSize: 14, fontFamily: Font.Helvetica,paddingLeft:5}, {color: 'black'}]}
      placeholderTextColor="gray"
    />
    {errors && touched && (
      <Text style={styles.loginPageStyle.errorMessage}>{errors}</Text>
    )}
  </View>
);
