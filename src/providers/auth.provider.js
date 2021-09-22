import DrawerNavigation from '../navigation/auth.user.navigation';
import React, {useEffect, useReducer, useMemo} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import RegistrationNavigator from '../navigation/registration.navigation';
import {useContext} from 'react';
import SplashScreen from '../components /spinner';
import {main as navigator} from '../navigation/screen.names';
import axios from 'axios';
import {useDispatch} from 'react-redux';
import {refresh} from '../store /error/actions';
import {getUserInfo} from '../store /user/user_data/actions';
/**
 * Use React Context API to check login user or not
 * @type {React.Context<null>}
 */
const AuthContext = React.createContext(null);
const Stack = createStackNavigator();

const MainNavigator = () => {
  const dispatchRefresh = useDispatch();
  const [state, dispatch] = useReducer(
      (prevState, {type,token}) => {
        switch (type) {
          case 'SET_TOKEN':
            return {...prevState, userToken: token, isLoading: false};
          case 'SIGN_IN':
            return {...prevState, isSignOut: false, userToken: token};
          case 'SIGN_OUT':
            return {...prevState, isSignOut: true, userToken: null};
        }
      },
      {
        isLoading: true,
        isSignOut: false,
        userToken: null,
      },
    ),
    authContext = useMemo(
      () => ({
        signIn: async () => {
          const token = await AsyncStorage.getItem('token');
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          dispatch({type: 'SIGN_IN', token: token});
          dispatchRefresh(getUserInfo());
        },
        signOut: async () => {
          await AsyncStorage.clear();
          dispatch({type: 'SIGN_OUT'});
          dispatchRefresh(refresh());
        },
      }),
      [],
    ),
    bootstrapAsync = async () => {
      let userToken;
      try {
        userToken = await AsyncStorage.getItem('token');
        axios.defaults.headers.common['Authorization'] = `Bearer ${userToken}`;
        await AsyncStorage.removeItem('reg_token');
        if (userToken) {
          dispatchRefresh(getUserInfo());
        }
      } catch (e) {}
      dispatch({type: 'SET_TOKEN', token: userToken});
    };
  useEffect(() => {
    bootstrapAsync();
  }, []);
  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer independent={true}>
        <Stack.Navigator headerMode="none">
          {state.isLoading ? (
            <Stack.Screen name={navigator.SignIn} component={SplashScreen} />
          ) : state.userToken == null ? (
            <Stack.Screen
              name="SignIn"
              component={RegistrationNavigator}
              options={{
                animationTypeForReplace: state.isSignOut ? 'pop' : 'push',
              }}
            />
          ) : (
            <Stack.Screen name={navigator.Home} component={DrawerNavigation} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
};
export const useAuthDataContext = () => useContext(AuthContext);
export default MainNavigator;
