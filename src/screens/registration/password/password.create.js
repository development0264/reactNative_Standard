import React, {useEffect} from 'react';
import {View} from 'react-native';
import Wrapper from '../../../components /ui/wrapper';
import Title from '../../../components /ui/title';
import {Formik} from 'formik';
import {passwordConfirmShema as passwordSchema} from '../../../config/formik.validation.schema';
import {Button} from 'react-native-elements';
import {main as styles} from '../../../styles/main';
import {useDispatch, useSelector} from 'react-redux';
import {sentPasswordsData} from '../../../store /user/registration/password/actions';
import RegistrationInput from '../../../components /inputs/registration.input';
import {registrationSteps as navigator} from '../../../navigation/screen.names';
import {password as passwords} from '../../../config/registration.values';
/**
 * Create unique password
 * @param navigate
 * @returns {*}
 */
export const PasswordCreate = ({navigation: {navigate}}) => {
  const {data, loading} = useSelector(r => r.PASSWORD_DATA),
    dispatch = useDispatch(),
    handleSubmit = data => dispatch(sentPasswordsData(data)),
    effect = () => data.message === 'OK' && navigate(navigator.SetAnonymous);

  useEffect(() => {
    effect();
  }, [loading]);
  return (
    <Wrapper>
      <Title
        title="Create Password"
        text="Please make sure your password is correct"
      />
      <Formik
        validationSchema={passwordSchema}
        initialValues={passwords}
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
              handleBlur={handleBlur}
              handleChange={handleChange}
              value={values.password}
              error={errors.password}
              touched={touched.password}
              secureTextEntry
              type="password"
              placeholder="Password"
            />
            <RegistrationInput
              handleBlur={handleBlur}
              handleChange={handleChange}
              value={values.confirmationPassword}
              error={errors.confirmationPassword}
              touched={touched.confirmationPassword}
              secureTextEntry
              type="confirmationPassword"
              placeholder="Confirm Password"
            />
            <Button
              onPress={handleSubmit}
              title="Next"
              loading={loading}
              disabled={loading}
            />
          </View>
        )}
      </Formik>
    </Wrapper>
  );
};
