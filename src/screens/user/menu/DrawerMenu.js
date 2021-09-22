import React from 'react';
import {View, Platform} from 'react-native';
import {DrawerItem, DrawerContentScrollView} from '@react-navigation/drawer';
import {Title, Drawer, Avatar} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import {main} from '../../../styles/main';
import {refreshStateData} from '../../../store /user/login/actions';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {useAuthDataContext} from '../../../providers/auth.provider';
import _ from 'lodash';
import {
  dashBoardNavigator as navigator,
  registrationSteps as registration,
} from '../../../navigation/screen.names';
import {headerTitle} from '../../../config/texts';

/**
 * Render right side menu fro user
 * @return {*}
 */
const styles = main.DrawerStyle;

export const DrawerMenu = () => {
  const data = useSelector(r => r.USER_INFO_DATA.data),
   {cards} = useSelector(r => r.CARD_DATA),
    dispatch = useDispatch(),
    navigation = useNavigation(),
    {signOut} = useAuthDataContext(),
    logOut = () => async () => {
      dispatch(refreshStateData());
      signOut();
      navigation.navigate(registration.Home, {screen: navigator.Main});
    };
  return (
    <DrawerContentScrollView>
      <View style={styles.drawerContent}>
        <View style={styles.userInfoSection}>
          <Avatar.Text
            size={54}
            label={`${data.firstName &&
              data.firstName.slice(0, 1).toLocaleUpperCase()}${data.lastName &&
              data.lastName.slice(0, 1).toLocaleUpperCase()}`}
            style={{backgroundColor: 'grey'}}
            labelStyle={{color: 'white'}}
          />
          <Title style={styles.title}>
            {data.firstName && data.firstName} {data.lastName && data.lastName}
          </Title>
        </View>
        <Drawer.Section style={styles.drawerSection}>
          {!_.isEmpty(cards[0])  && (
            <DrawerItem
              icon={({color, size}) => (
                <MaterialCommunityIcons
                  name="view-dashboard-outline"
                  color={color}
                  size={size}
                />
              )}
              label={headerTitle.DrawerMain}
              onPress={() =>
                navigation.navigate(registration.Home, {
                  screen: navigator.Dashboard,
                })
              }
            />
          )}
          <DrawerItem
            icon={({color, size}) => (
              <MaterialCommunityIcons
                name="account-outline"
                color={color}
                size={size}
              />
            )}
            label={headerTitle.Profile}
            onPress={() =>
              navigation.navigate(registration.Home, {
                screen: navigator.Profile,
              })
            }
          />
          <DrawerItem
            icon={({color, size}) => (
              <MaterialCommunityIcons name="tune" color={color} size={size} />
            )}
            label={
              (_.isEmpty(cards[0]) && headerTitle.AddCard) ||
              headerTitle.Cards
            }
            onPress={() =>
              navigation.navigate(registration.Home, {screen: navigator.Cards})
            }
          />
          {!_.isEmpty(cards[0]) && (
            <DrawerItem
              icon={({color, size}) => (
                <MaterialCommunityIcons
                  name="format-vertical-align-top"
                  color={color}
                  size={size}
                />
              )}
              label={headerTitle.SendPayment}
              onPress={() =>
                navigation.navigate(registration.Home, {
                  screen: navigator.SendPayment,
                  params: { showSend: true }
                })
              }
            />
          )}
          {/*{!_.isEmpty(cards[0]) && (*/}
          {/*  <DrawerItem*/}
          {/*    icon={({color, size}) => (*/}
          {/*      <MaterialCommunityIcons*/}
          {/*        name="format-vertical-align-bottom"*/}
          {/*        color={color}*/}
          {/*        size={size}*/}
          {/*      />*/}
          {/*    )}*/}
          {/*    label={headerTitle.GetPayments}*/}
          {/*    onPress={() =>*/}
          {/*      navigation.navigate(registration.Home, {*/}
          {/*        screen: navigator.GetPayments,*/}
          {/*      })*/}
          {/*    }*/}
          {/*  />*/}
          {/*)}*/}
        </Drawer.Section>
        <DrawerItem
          icon={({color, size}) => (
            <MaterialCommunityIcons
              name="logout-variant"
              color={color}
              size={size}
            />
          )}
          label={headerTitle.LogOut}
          onPress={logOut()}
        />
      </View>
    </DrawerContentScrollView>
  );
};
