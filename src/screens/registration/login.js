import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Formik } from 'formik';
import { Button } from 'react-native-elements';
import Wrapper from '../../components/ui/wrapper';
import Title from '../../components/ui/title';
import HelperText from '../../components /ui/helper.text';
import { logInShema as logInSchema } from '../../config/formik.validation.schema';
import { main as styles } from '../../styles/main';
import { useDispatch, useSelector } from 'react-redux';
import { loginUserData } from '../../store /user/login/actions';
import { useAuthDataContext } from '../../providers/auth.provider';
import RegistrationInput from '../../components /inputs/registration.input';
import { registrationSteps as navigator } from '../../navigation/screen.names';
import { logIn } from '../../config/registration.values';
import { buttonText, helperText, UA, USA } from '../../config/texts';
/**
 * Main page when user choose make new account or enter in existing
 * @param navigate
 * @param showNotification
 * @returns {*}
 */
const Login = ({ navigation: { navigate } }) => {
  const dispatch = useDispatch(),
    { loading, auth } = useSelector(data => data.LOGIN_DATA),
    [mask, setMask] = useState(USA),
    { signIn } = useAuthDataContext(),
    _handleCredentialValuesSend = data => dispatch(loginUserData(data)),
    effect = () => {
      auth && signIn();
    },
    formatPhone = phone => {
      const phoneInput = phone.startsWith('+ 1');
      phoneInput ? setMask(USA) : setMask(UA);
      return phone;
    };
  useEffect(effect, [loading]);
  return (
    <Wrapper>
      <Title
        text="I don’t have an account yet"
        title="Welcome Back!"
        line="underline"
        onPress={() => navigate(navigator.CreateProfile)}
      />
      <Formik
        validationSchema={logInSchema}
        initialValues={logIn}
        onSubmit={values => _handleCredentialValuesSend(values)}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View style={styles.loginPageStyle.container}>
            <RegistrationInput
              handleChange={handleChange}
              handleBlur={handleBlur}
              value={values.phone}
              icon="phone"
              touched={touched.phone}
              phone
              type="phone"
              error={errors.phone}
              mask={mask}
              formatPhone={formatPhone}
            />
            <RegistrationInput
              handleChange={handleChange}
              handleBlur={handleBlur}
              value={values.password}
              icon="lock"
              touched={touched.password}
              type="password"
              error={errors.password}
              secureTextEntry
            />
            <Button
              onPress={handleSubmit}
              loading={loading}
              title={buttonText.LogIn}
              disabled={loading}
            />
          </View>
        )}
      </Formik>
      <HelperText
        text={helperText.Forgot}
        onPress={() => navigate(navigator.ForgotPassword)}
      />
    </Wrapper>
  );
};
export default Login;
