import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {Formik} from 'formik';
import {Button} from 'react-native-elements';
import Wrapper from '../../../components /ui/wrapper';
import Title from '../../../components /ui/title';
import HelperText from '../../../components /ui/helper.text';
import {phoneNumber as phoneSchema} from '../../../config/formik.validation.schema';
import {main as styles} from '../../../styles/main';
import {useSelector, useDispatch} from 'react-redux';
import {
  setPhoneNumberData,
  sentData,
} from '../../../store /user/registration/full_name/actions';
import RegistrationInput from '../../../components /inputs/registration.input';
import {registrationSteps as navigator} from '../../../navigation/screen.names';
import {phone_create} from '../../../config/registration.values';
import {USA, UA} from '../../../config/texts';
/**
 * Phone create screen and send it to back-end
 * @param navigate
 * @param showNotification
 * @returns {*}
 */
const PhoneCreate = ({navigation: {navigate}}) => {
  const {
      data: {loading},
      userInfo, createAccount
    } = useSelector(res => res.REGISTRATION_DATA),
    dispatch = useDispatch(),
    [phone, setPhone] = useState(''),
    [mask, setMask] = useState(USA),
    formatPhone = phone_number => {
      const phoneInput = phone_number.startsWith('+ 1');
      phoneInput ? setMask(USA) : setMask(UA);
      return phone_number;
    },
    handleSubmit = value => {
      const {phone} = {...value, phone: value.phone.replace(/[^+\d]/g, '')};
      setPhone(value.phone);
      dispatch(setPhoneNumberData({...value, phone}));
      dispatch(sentData({...userInfo,...createAccount, phone,}));
    },
    effect = async () => {
      const token = await AsyncStorage.getItem('reg_token');
      token && navigate(navigator.ConfirmPhone, {phone});
    };
  useEffect(() => {
    effect();
  }, [loading]);
  return (
    <Wrapper>
      <Title
        title="Phone Verification"
        text="Please make sure your phone number is correct"
      />
      <Formik
        validationSchema={phoneSchema}
        initialValues={phone_create}
        onSubmit={values => handleSubmit(values)}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View style={styles.sameStyle.container}>
            <RegistrationInput
              handleChange={handleChange}
              handleBlur={handleBlur}
              value={values.phone}
              placeholder="Phone Number"
              error={errors.phone}
              touched={touched.phone}
              type="phone"
              phone
              formatPhone={formatPhone}
              mask={mask}
            />
            <Button
              onPress={handleSubmit}
              loading={loading}
              title="Next"
              disabled={loading}
            />
          </View>
        )}
      </Formik>
      <HelperText
        text="I already have an account"
        onPress={() => navigate(navigator.HomeScreen)}
      />
    </Wrapper>
  );
};
export default PhoneCreate;
