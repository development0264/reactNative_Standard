import React, {useEffect} from 'react';
import {main as styles} from '../../styles/main';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import MaskedInput from 'react-native-masked-input-text';
import {Platform, Text, TextInput, View} from 'react-native';
import Proptypes from 'prop-types';
import {colors} from '../../styles/colors';

const RegistrationInput = ({
  phone,
  icon,
  value,
  touched,
  type,
  error,
  placeholder,
  secureTextEntry,
  handleChange,
  handleBlur,
  formatPhone,
  mask,
}) => {
  const renderError = () => (touched && error ? colors.red : colors.grey);
  useEffect(() => {
    renderError();
  }, [error, touched]);
  return (
    <View>
      {placeholder && (
        <View
          style={
            Platform.OS === 'ios' && styles.loginPhoneStyle.placeholderStyle
          }>
          <Text
            style={[
              styles.loginPhoneStyle.placeholderStyle,
              {color: renderError(), borderRightColor: renderError()},
            ]}>
            {placeholder}
          </Text>
        </View>
      )}
      <View
        style={[
          styles.loginPhoneStyle.containerStyle,
          {borderColor: renderError()},
        ]}>
        {icon && (
          <MaterialCommunityIcons
            name={icon}
            color={touched && error ? colors.red : colors.grey}
            size={24}
            style={[styles.loginPhoneStyle.iconStyle]}
          />
        )}
        {phone ? (
          <MaskedInput
            onChangeText={handleChange(type)}
            handleBlur={handleBlur(type)}
            value={formatPhone(value)}
            style={[styles.loginPhoneStyle.phoneStyle]}
            mask={mask}
          />
        ) : (
          <TextInput
            inputContainerStyle={{borderBottomWidth: 0}}
            onChangeText={handleChange(type)}
            handleBlur={handleBlur(type)}
            value={value}
            style={[styles.loginPhoneStyle.phoneStyle]}
            secureTextEntry={secureTextEntry}
            mode="outline"
          />
        )}
      </View>
      <Text style={[styles.loginPageStyle.errorMessage]}>
        {error && touched && error}
      </Text>
    </View>
  );
};
RegistrationInput.proptotypes = {
  icon: Proptypes.string,
  value: Proptypes.string.isRequired,
  phone: Proptypes.bool,
  touched: Proptypes.string.isRequired,
  error: Proptypes.string.isRequired,
  type: Proptypes.string.isRequired,
  handleChange: Proptypes.func.isRequired,
  handleBlur: Proptypes.func.isRequired,
  formatPhone: Proptypes.func,
  mask: Proptypes.string,
  secureTextEntry: Proptypes.bool,
};
export default RegistrationInput;
