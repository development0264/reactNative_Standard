import React from 'react';
import {View} from 'react-native';
import CodeInput from 'react-native-confirmation-code-input';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const CodeConfirm = ({code, onFinishCheckingCode}) => (
  <View style={{flexDirection: 'row', width: '90%'}}>
    {code ? (
      <CodeInput
        secureTextEntry
        compareWithCode={`${code}`}
        activeColor="black"
        inactiveColor="grey"
        autoFocus={false}
        ignoreCase={true}
        keyboardType="numeric"
        inputPosition="center"
        textContentType='oneTimeCode'
        size={52}
        codeLength={6}
        onFulfill={isValid => onFinishCheckingCode(isValid)}
        containerStyle={{marginTop: 30}}
        codeInputStyle={{borderWidth: 1.5}}
      />
    ) : (
      <CodeInput
        secureTextEntry
        activeColor="black"
        inactiveColor="grey"
        autoFocus={false}
        ignoreCase={true}
        inputPosition="center"
        keyboardType="numeric"
        size={wp('13')}
        codeLength={6}
        onFulfill={code => onFinishCheckingCode(code)}
        containerStyle={{marginTop: hp('3%')}}
        codeInputStyle={{borderWidth: 1.5}}
      />
    )}
  </View>
);
export default CodeConfirm;
