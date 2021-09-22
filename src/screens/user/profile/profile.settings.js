import React, {useState, useEffect, useRef, createRef} from 'react';
import {ScrollView, View, Switch} from 'react-native';
import {Button, CheckBox, Icon, Input, Text} from 'react-native-elements';
import {main as styles} from '../../../styles/main';
import {colors} from '../../../styles/colors';
import {Formik} from 'formik';
import MainHeader from '../../../components /ui/header';
import {useSelector, useDispatch} from 'react-redux';
import {
  updateUserData,
  refreshUpdateMessage,
  getUserInfo,
} from '../../../store /user/user_data/actions';
import _ from 'lodash';
import DropdownAlert from 'react-native-dropdownalert';
import {Font} from '../../../config/data';
import {headerTitle} from '../../../config/texts';
import ProfileInput from '../../../components /inputs/profile.input';
import {userSettingShema as validationSchema} from '../../../config/formik.validation.schema';
/**
 * Profile Screen of  user ,user can change his information
 * @returns {*}
 */
const ProfileSettings = () => {
  const data = useSelector(r => r.USER_INFO_DATA),
    dispatch = useDispatch(),
    [anonType, setChecked] = useState(data.data.isAnonUser),
    initialValues = {...data.data,email:data.data.email || ''},
    alertRef = useRef(),
    [isEnabled, setIsEnabled] = useState(false),
    handleSubmit = values =>
      dispatch(updateUserData({...values, isAnonUser: anonType}));

  useEffect(() => {
    !_.isEmpty(data.response) &&
      alertRef.current.alertWithType(
        'success',
        'Success',
        'Your profile update successful',
      );
    setIsEnabled(false);
    dispatch(refreshUpdateMessage());
    dispatch(getUserInfo());
  }, [data.response]);

  return (
    <>
      <ScrollView style={{backgroundColor: 'white'}}>
        <MainHeader title={headerTitle.Profile} />
        <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
          <View style={styles.ProfileSettings.profileWrapper}>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={values => handleSubmit(values)}>
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
              }) => (
                <View
                  style={[
                    styles.sameStyle.container,
                    styles.ProfileSettings.formWrapper,
                  ]}>
                  <ProfileInput
                    onChangeText={handleChange('username')}
                    onBlur={handleBlur('username')}
                    value={values.username}
                    label="Profile Name:"
                    disabled={!isEnabled}
                    error={errors.username}
                    touched={touched.username}
                  />
                  <ProfileInput
                    onChangeText={handleChange('firstName')}
                    onBlur={handleBlur('firstName')}
                    value={values.firstName}
                    label="First Name:"
                    disabled={!isEnabled}
                    error={errors.firstName}
                    touched={touched.firstName}
                  />
                  <ProfileInput
                    onChangeText={handleChange('lastName')}
                    onBlur={handleBlur('lastName')}
                    value={values.lastName}
                    label="Last Name :"
                    disabled={!isEnabled}
                    error={errors.lastName}
                    touched={touched.lastName}
                  />
                  <ProfileInput
                    onChangeText={handleChange('phone')}
                    onBlur={handleBlur('phone')}
                    value={values.phone}
                    style={styles.phoneStyle}
                    label={'Phone Number :'}
                    disabled
                    rightIcon={
                      <Icon name="check-box" size={24} color={'green'} />
                    }
                  />
                  <ProfileInput
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                    label={`Email : ${(!values.isEmailConfirm &&
                      values.email &&
                      '(not-confirm)') ||
                      ''} `}
                    disabled={!isEnabled}
                    rightIcon={
                      <Icon
                        name={
                          values.email ? 'check-box' : 'indeterminate-check-box'
                        }
                        size={24}
                        color={values.isEmailConfirm ? 'green' : 'red'}
                      />
                    }
                    error={errors.email}
                    touched={touched.email}
                  />
                  <CheckBox
                    center
                    title="Stay anonymous inside the app?"
                    fontFamily={Font.Helvetica}
                    checkedColor="grey"
                    disabled={!isEnabled}
                    onPress={() => setChecked(!anonType)}
                    checked={anonType}
                    containerStyle={styles.ProfileSettings.checkBoxStyle}
                  />
                  <View style={styles.ProfileSettings.bottomWrapper}>
                    <Button
                      onPress={handleSubmit}
                      title="Save"
                      loading={data.updateLoading}
                      disabled={
                        data.updateLoading ||
                        !isEnabled ||
                        _.isEqual(
                          {...values, isAnonUser: anonType},
                          initialValues,
                        )
                      }
                    />
                    <View style={styles.ProfileSettings.switcherEdit}>
                      <Text>Edit</Text>
                      <Switch
                        thumbColor={isEnabled ? colors.white : '#f4f3f4'}
                        ios_backgroundColor={colors.white}
                        onValueChange={() =>
                          _.isEqual(
                            {...values, isAnonUser: anonType},
                            initialValues,
                          ) && setIsEnabled(previousState => !previousState)
                        }
                        value={isEnabled}
                      />
                    </View>
                  </View>
                </View>
              )}
            </Formik>
          </View>
        </View>
      </ScrollView>
      <DropdownAlert ref={alertRef} />
    </>
  );
};
export default ProfileSettings;
