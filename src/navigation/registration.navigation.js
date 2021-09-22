import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../screens/registration/login';
import {Full_nameCreate} from '../screens/registration/full_name/full_name.create';
import PhoneCreate from '../screens/registration/phone/phone.create';
import PhoneConfirm from '../screens/registration/phone/phone.confirm';
import {PasswordCreate} from '../screens/registration/password/password.create';
import EmailCreate from '../screens/registration/email/email.create';
import EmailConfirm from '../screens/registration/email/email.confirm';
import Presentation from '../screens/registration/final_steps/presentation';
import FinishRegistration from '../screens/registration/final_steps/finish.registration';
import DrawerNavigation from './auth.user.navigation';
import AnonymousScreen from '../screens/registration/anonymous_type/anonymous.select';
import FrogotNavigation from './frogot.navigation';
import {registrationSteps as navigator} from './screen.names';
import {PersonalInfo} from "../screens/registration/full_name/personal.info.create";

/**
 * Navigation steps of user navigation
 **/
const Stack = createStackNavigator();

const RegistrationNavigator = () => (
  <NavigationContainer independent={true}>
    <Stack.Navigator initialRouteName={navigator.HomeScreen} headerMode="none">
      <Stack.Screen name={navigator.HomeScreen} component={Login} />
      <Stack.Screen name={navigator.CreateProfile} component={Full_nameCreate} />
      <Stack.Screen
        name={navigator.CreatePhone}
        component={PhoneCreate}
      />
      <Stack.Screen
        name={navigator.ConfirmPhone}
        component={PhoneConfirm}
      />
      <Stack.Screen
        name={navigator.CreatePassword}
        component={PasswordCreate}
      />
      <Stack.Screen
          name={navigator.PersonalInfo}
          component={PersonalInfo}
      />
      <Stack.Screen name={navigator.SetAnonymous} component={AnonymousScreen} />
      <Stack.Screen
        name={navigator.CreateEmail}
        component={EmailCreate}
      />
      <Stack.Screen
        name={navigator.ConfirmEmail}
        component={EmailConfirm}
      />
      <Stack.Screen
        name={navigator.Presentation}
        component={Presentation}
      />
      <Stack.Screen name={navigator.Finish} component={FinishRegistration} />
      <Stack.Screen name={navigator.Home} component={DrawerNavigation} />
      <Stack.Screen
        name={navigator.ForgotPassword}
        component={FrogotNavigation}
      />
    </Stack.Navigator>
  </NavigationContainer>
);
export default RegistrationNavigator;
