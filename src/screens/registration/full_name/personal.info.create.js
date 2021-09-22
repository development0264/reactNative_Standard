import React, {useRef} from 'react';
import {SafeAreaView, ScrollView, View} from 'react-native';
import {Formik} from 'formik';
import {Button, Text} from 'react-native-elements';
import Wrapper from '../../../components /ui/wrapper';
import Title from '../../../components /ui/title';
import {creatAccountSchema } from '../../../config/formik.validation.schema';
import {main as styles} from '../../../styles/main';
import {createPersonalInfo} from '../../../store /user/registration/full_name/actions';
import {useDispatch} from 'react-redux';
import RegistrationInput from '../../../components /inputs/registration.input';
import {registrationSteps as navigator} from '../../../navigation/screen.names';
import {createAccount} from '../../../config/registration.values';
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import * as ReactNative from "react-native";

/**
 * Create basic user user_data to continue registration
 * @param navigate
 * @returns {*}
 */
export const PersonalInfo = ({navigation: {navigate}}) => {
    const dispatch = useDispatch(),
        _handleSubmit = data => {
            dispatch(createPersonalInfo(data));
            navigate(navigator.CreatePhone);
        };
   const mask = '00-00-0000';
   const setMask = (value) => {
       return value
   } ;
   let inputEl = useRef(null);
    const _scrollToInput = (reactNode)=>
        inputEl.current.scrollToFocusedInput(reactNode)


    return (
        <Wrapper>
            <KeyboardAwareScrollView  contentContainerStyle={{flex:1,justifyContent:'center'}} ref={inputEl} onFocus={(event) => {
                _scrollToInput(ReactNative.findNodeHandle(event.target))
            }}>
            <Title
                title="Personal Info"
                text="Please fill all fields to proceed registration"
            />

            <Formik
                validationSchema={creatAccountSchema}
                initialValues={createAccount}
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
                            style={{marginTop:20}}
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                            value={values.dob}
                            placeholder="DOB"
                            error={errors.dob}
                            touched={touched.dob}
                            type="dob"
                            phone
                            mask={mask}
                            formatPhone={setMask}
                        />
                        <RegistrationInput
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                            value={values.ssn}
                            placeholder="Last four digit for SSN"
                            error={errors.ssn}
                            secureTextEntry
                            touched={touched.ssn}
                            type="ssn"
                        />
                        <RegistrationInput
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                            value={values.address}
                            placeholder="Address"
                            error={errors.address}
                            touched={touched.address}
                            type="address"
                        />
                        <RegistrationInput
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                            value={values.city}
                            placeholder="City"
                            error={errors.city}
                            touched={touched.city}
                            type="city"
                        />
                        <RegistrationInput
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                            value={values.state}
                            placeholder="State"
                            error={errors.state}
                            touched={touched.state}
                            type="state"
                        />
                        <RegistrationInput
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                            value={values.zip}
                            placeholder="Zip"
                            error={errors.zip}
                            touched={touched.zip}
                            type="zip"
                        />
                        <Button onPress={handleSubmit} title="Next" />
                    </View>
                )}
            </Formik>
            </KeyboardAwareScrollView>
        </Wrapper>
    );
};
