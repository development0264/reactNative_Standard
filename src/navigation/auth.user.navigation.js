import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import NavigationContainer from '@react-navigation/native/src/NavigationContainer';
import {DrawerMenu} from '../screens/user/menu/DrawerMenu';
import ProfileScreen from '../screens/user/profile/profile.settings';
import CardsWrapper from '../screens/user/cards/cards.wrapper';
import MainNavigator from '../providers/auth.provider';
import SendTransaction from '../screens/user/transactions/send.transaction';
import GetTransaction from '../screens/user/transactions/get.transaction';
import CardsHistory from '../screens/user/cards/card.transactions.info';
import TransactionHistoryDetails from '../screens/user/cards/transactiondetails';
import {dashBoardNavigator as navigation} from './screen.names';
import Dashboard from '../screens/user/main/dashboard';
import Wrapper from '../screens/user/main/wrapper';

/**
 * User DashboardScreens
 */
const AuthUserNavigation = createDrawerNavigator();

const DrawerNavigation = () => {
  return (
    <NavigationContainer independent={true}>
      <AuthUserNavigation.Navigator
        headerMode="none"
        drawerContent={() => <DrawerMenu />}>
        <AuthUserNavigation.Screen
          name={navigation.HomeScreen}
          component={Wrapper}
        />
        <AuthUserNavigation.Screen
          name={navigation.Profile}
          component={ProfileScreen}
        />
        <AuthUserNavigation.Screen
          name={navigation.Main}
          component={MainNavigator}
        />
        <AuthUserNavigation.Screen
          name={navigation.SendPayment}
          component={SendTransaction}
        />
        <AuthUserNavigation.Screen
          name={navigation.GetPayments}
          component={GetTransaction}
        />
        <AuthUserNavigation.Screen
          name={navigation.History}
          component={CardsHistory}
        />
        <AuthUserNavigation.Screen
          name={navigation.TransactionDetails}
          component={TransactionHistoryDetails}
          />
        <AuthUserNavigation.Screen
          name={navigation.Cards}
          component={CardsWrapper}
        />
        <AuthUserNavigation.Screen
          name={navigation.Dashboard}
          component={Dashboard}
        />
      </AuthUserNavigation.Navigator>
    </NavigationContainer>
  );
};
export default DrawerNavigation;
