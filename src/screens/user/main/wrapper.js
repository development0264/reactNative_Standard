import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import _ from 'lodash';
import Dashboard from './dashboard';
import CardsWrapper from '../cards/cards.wrapper';
import SplashScreen from '../../../components /spinner';
import {_readTagEventBackground, NearByBackGroundEvent} from '../transactions/get.transaction';
import {Platform} from 'react-native';

const Wrapper = ({navigation}) => {
  const {
      loading,
      data: {cards = null},
    } = useSelector(r => r.USER_INFO_DATA),
    renderItems = () =>
      (!_.isEmpty(cards) && Platform.OS === 'android' ? (
        <Dashboard navigation={navigation} />
      ) : (
        <CardsWrapper navigation={navigation} />
      )) || <CardsWrapper navigation={navigation} />;
  useEffect(() => {
    Platform.OS === 'android' && _readTagEventBackground(navigation);
    Platform.OS === 'ios'  && NearByBackGroundEvent()
  }, []);
  return <>{(loading && <SplashScreen />) || renderItems()}</>;
};
export default Wrapper;
