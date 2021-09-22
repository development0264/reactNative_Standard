import React, {useEffect, useRef, useState} from 'react';
import {View} from 'react-native';
import {Formik} from 'formik';
import {Button} from 'react-native-elements';
import Wrapper from '../../../components /ui/wrapper';
import Title from '../../../components /ui/title';
import {RestorephoneNumber as restorePhoneSchema} from '../../../config/formik.validation.schema';
import {main as styles} from '../../../styles/main';
import {restorePasswordSent} from '../../../store /user/registration/forgot/password/action';
import {useDispatch, useSelector} from 'react-redux';
import _ from 'lodash';
import HelperText from '../../../components /ui/helper.text';
import DropdownAlert from 'react-native-dropdownalert';
import RegistrationInput from '../../../components /inputs/registration.input';
import {forgotPasswordSteps as navigator} from '../../../navigation/screen.names';
import {phone_create as restorePhone} from '../../../config/registration.values';
import {USA, UA} from '../../../config/texts';
/**
 * Enter phone number to make new password
 * @param navigate
 * @returns {*}
 */
const PhoneEnterScreen = ({navigation: {navigate}}) => {
  const {loading, response} = useSelector(r => r.RESTORE_DATA),
    dispatch = useDispatch(),
    [mask, setMask] = useState(USA),
    [phone, setConfirm_phone] = useState(''),
    alertRef = useRef(null),
    handleSubmit = ({phone}) => {
      setConfirm_phone(phone);
      dispatch(restorePasswordSent(phone));
    },
    formatPhone = phone => {
      const phoneInput = phone.startsWith('+ 1');
      phoneInput ? setMask(USA) : setMask(UA);
      return phone;
    };
  useEffect(() => {
    !_.isEmpty(response) && navigate(navigator.ForgotConfirmPhone, {phone});
  }, [loading]);
  return (
    <Wrapper>
      <Title title="Restore Password" text="Enter your phone number" />
      <Formik
        validationSchema={restorePhoneSchema}
        initialValues={restorePhone}
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
              phone
              formatPhone={formatPhone}
              mask={mask}
              handleChange={handleChange}
              handleBlur={handleBlur}
              value={values.phone}
              error={errors.phone}
              touched={touched.phone}
              type="phone"
              placeholder="Phone Number"
            />
            <Button
              onPress={handleSubmit}
              loading={loading}
              title="Submit"
              disabled={loading}
            />
          </View>
        )}
      </Formik>
      <HelperText text="Back" onPress={() => navigate(navigator.HomeScreen)} />
      <DropdownAlert ref={alertRef} />
    </Wrapper>
  );
};
export default PhoneEnterScreen;
