import React, {useEffect, useRef} from 'react';
import {View} from 'react-native';
import Wrapper from '../../../components /ui/wrapper';
import Title from '../../../components /ui/title';
import {Formik} from 'formik';
import {restorePasswordConfirmShema as restorePasswordSchema} from '../../../config/formik.validation.schema';
import {Button} from 'react-native-elements';
import {main as styles} from '../../../styles/main';
import {useDispatch, useSelector} from 'react-redux';
import {
  resetPasswordData,
  sentCreatePasswordData,
} from '../../../store /user/registration/forgot/password/action';
import DropdownAlert from 'react-native-dropdownalert';
import RegistrationInput from '../../../components /inputs/registration.input';
import {forgotPasswordSteps as navigator} from '../../../navigation/screen.names';
import {password as restorePassword} from '../../../config/registration.values';
/**
 * Create new password and redirect to Login.js
 * @param navigate
 * @param showNotification
 * @returns {*}
 */
const PasswordCreate = ({navigation: {navigate}}) => {
  const {data, loading} = useSelector(r => r.RESTORE_DATA.createPassword),
    dispatch = useDispatch(),
    alertRef = useRef(),
    handleSubmit = values => dispatch(sentCreatePasswordData(values));

  useEffect(() => {
    data.message === 'OK' &&
      (alertRef.current.alertWithType(
        'success',
        'Success',
        'Your password update successful',
      ),
      setTimeout(() => navigate(navigator.HomeScreen), 2000),
      dispatch(resetPasswordData()));
  }, [loading]);

  return (
    <Wrapper>
      <Title title="Create password" text="Please create a  new  password" />
      <Formik
        validationSchema={restorePasswordSchema}
        initialValues={restorePassword}
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
              value={values.password}
              error={errors.password}
              touched={touched.password}
              type="password"
              placeholder="Password"
              secureTextEntry
            />
            <RegistrationInput
              handleChange={handleChange}
              handleBlur={handleBlur}
              value={values.confirmationPassword}
              error={errors.confirmationPassword}
              touched={errors.confirmationPassword}
              placeholder="Confirm Password"
              type="confirmationPassword"
              secureTextEntry
            />
            <Button
              onPress={handleSubmit}
              loading={loading}
              title="Save"
              disabled={loading}
            />
          </View>
        )}
      </Formik>
      <DropdownAlert ref={alertRef} closeInterval={1000} />
    </Wrapper>
  );
};
export default PasswordCreate;
