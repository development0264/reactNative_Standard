import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import PhoneEnterScreen from '../screens/registration/forgot/phone.enter';
import PhoneConfirm from '../screens/registration/forgot/phone.confirm';
import CreateNewPasswordScreen from '../screens/registration/forgot/password.create';
import MainNavigation from '../providers/auth.provider';
import {forgotPasswordSteps as navigator} from './screen.names';

/**
 * Restore password steps  using phone number
 */
const Stack = createStackNavigator();

const FrogotNavigation = () => (
  <NavigationContainer independent={true}>
    <Stack.Navigator
      initialRouteName={navigator.ForgotCreatePhone}
      headerMode="none">
      <Stack.Screen
        name={navigator.ForgotCreatePhone}
        component={PhoneEnterScreen}
      />
      <Stack.Screen
        name={navigator.ForgotConfirmPhone}
        component={PhoneConfirm}
      />
      <Stack.Screen
        name={navigator.ForgotCreatePassword}
        component={CreateNewPasswordScreen}
      />
      <Stack.Screen name={navigator.HomeScreen} component={MainNavigation} />
    </Stack.Navigator>
  </NavigationContainer>
);
export default FrogotNavigation;
