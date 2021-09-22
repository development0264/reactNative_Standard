import React from 'react';
import {View} from 'react-native';
import {Formik} from 'formik';
import {Button} from 'react-native-elements';
import Wrapper from '../../../components /ui/wrapper';
import Title from '../../../components /ui/title';
import HelperText from '../../../components /ui/helper.text';
import {personalShema as fullNameSchema} from '../../../config/formik.validation.schema';
import {main as styles} from '../../../styles/main';
import {setFullNameData} from '../../../store /user/registration/full_name/actions';
import {useDispatch} from 'react-redux';
import RegistrationInput from '../../../components /inputs/registration.input';
import {registrationSteps as navigator} from '../../../navigation/screen.names';
import {fullName} from '../../../config/registration.values';

/**
 * Create basic user user_data to continue registration
 * @param navigate
 * @returns {*}
 */
export const Full_nameCreate = ({navigation: {navigate}}) => {
  const dispatch = useDispatch(),
    _handleSubmit = data => {
      dispatch(setFullNameData(data));
      navigate(navigator.PersonalInfo);
    };

  return (
    <Wrapper>
      <Title
        title="Create Account"
        text="Please fill all fields to proceed registration"
      />
      <Formik
        validationSchema={fullNameSchema}
        initialValues={fullName}
        onSubmit={values => _handleSubmit(values)}>
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
              value={values.firstName}
              placeholder="First Name"
              error={errors.firstName}
              touched={touched.firstName}
              type="firstName"
            />
            <RegistrationInput
              handleChange={handleChange}
              handleBlur={handleBlur}
              value={values.lastName}
              placeholder="Last Name"
              error={errors.lastName}
              touched={touched.lastName}
              type="lastName"
            />
            <RegistrationInput
              handleChange={handleChange}
              handleBlur={handleBlur}
              value={values.username}
              placeholder="Profile Name"
              error={errors.username}
              touched={touched.username}
              type="username"
            />
            <Button onPress={handleSubmit} title="Next" />
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
