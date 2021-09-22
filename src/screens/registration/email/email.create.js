import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import Wrapper from '../../../components /ui/wrapper';
import Title from '../../../components /ui/title';
import {Formik} from 'formik';
import {emailCreateShema as emailSchema} from '../../../config/formik.validation.schema';
import {Button} from 'react-native-elements';
import {main as styles} from '../../../styles/main';
import {useDispatch, useSelector} from 'react-redux';
import {
  emailSentData,
  refreshRegistrationEmail,
} from '../../../store /user/registration/email/actions';
import _ from 'lodash';
import RegistrationInput from '../../../components /inputs/registration.input';
import {registrationSteps as navigator} from '../../../navigation/screen.names';
import {email as emailValues} from '../../../config/registration.values';
/**
 * Create email(optional)  or skip this step
 * @param navigate
 * @param showNotification
 * @returns {*}
 */
const EmailCreate = ({navigation: {navigate}}) => {
  const {loading, response} = useSelector(r => r.EMAIL_DATA.emailData),
    [email, setEmail] = useState(null),
    dispatch = useDispatch(),
    handleSubmit = data => {
      setEmail(data.email);
      dispatch(emailSentData(data));
    },
    effect = () => {
      !_.isEmpty(response) &&
        (navigate(navigator.ConfirmEmail, {email}),
        dispatch(refreshRegistrationEmail()));
    };
  useEffect(() => {
    effect();
  }, [loading]);
  return (
    <Wrapper>
      <Title title="Email Verification" text="Please create an email" />
      <Formik
        validationSchema={emailSchema}
        initialValues={emailValues}
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
              error={errors.email}
              touched={touched.email}
              value={values.email}
              placeholder="Email"
              handleChange={handleChange}
              type="email"
              handleBlur={handleBlur}
            />
            <View style={styles.emailCreate.buttonsStyle}>
              <Button
                onPress={handleSubmit}
                loading={loading}
                title="Next"
                disabled={loading}
              />
              <Button
                onPress={() => navigate(navigator.Presentation)}
                title="Skip"
              />
            </View>
          </View>
        )}
      </Formik>
    </Wrapper>
  );
};
export default EmailCreate;
