import React, {useState, useEffect} from 'react';
import Wrapper from '../../../components /ui/wrapper';
import MainHeader from '../../../components /ui/header';
import NfcManager, {Ndef} from 'react-native-nfc-manager';
import {useDispatch, useSelector} from 'react-redux';
import {Button, Card, Text} from 'react-native-elements';
import {
  Alert,
  Image,
  ScrollView,
  View,
  StyleSheet,
  Platform,
  AsyncStorage
} from 'react-native';
import _ from 'lodash';
import {main as style} from '../../../styles/main';
import {getCardInfoData} from '../../../store /user/card/card_info/actions';
import {checkAmount, renderLastFour} from '../../../utils/payment_card.util';
import {headerTitle} from '../../../config/texts';
import {
  transactionDelay,
  transactionDelayClear,
} from '../../../store /user/transactions/delay/actions';
import {colors} from '../../../styles/colors';
import {urlData} from '../../../config/data';
import {nfc_icon, visa_send} from '../../../config/images';
import {NearbyAPI} from '@adrianso/react-native-nearby-api';
import {API_NEARBY_KEY} from '../../../config/data';
import ReactNativeHapticFeedback from "react-native-haptic-feedback";

/** Haptic feedback parameters */
const options = {
  enableVibrateFallback: true, 
  ignoreAndroidSystemSettings: false
}

/**
 * Send Funds screen send data with NFC
 * @returns {*}
 */
const SendTransaction = ({navigation, route}) => {
  const funds = useSelector(e => e.SELECTED_FUNDS_DATA.sum),
    {cards} = useSelector(r => r.CARD_DATA),
    {transactionCode, loading} = useSelector(r => r.TRANSACTION_DELAY_DATA),
      user = useSelector(r=>r.USER_INFO_DATA.data),
    defaultCardNumber = !_.isEmpty(cards) && cards[0],
    [showSendBtn, setShowSendBtn] = useState(route.params.showSend),
    {url, mimeType} = urlData,
    dispatch = useDispatch(),
    nearbyAPI = new NearbyAPI(true),
    _sendNearByData = () => {
      AsyncStorage.getItem('token').then( (ltoken) => {
        const data = `${user.id},${checkAmount(funds)},${user.csCardToken},${ltoken}`;
        nearbyAPI.publish(data);
        setTimeout(()=>nearbyAPI.unpublish(),3000);
        Alert.alert(`You Were Be$towed $${checkAmount(funds)}`)
        ReactNativeHapticFeedback.trigger("impactMedium",options);
      })
    },
      _sentNFCdata = () => {
        _sendNearByData();
        AsyncStorage.getItem('token').then( (ltoken) => {
          const data = `=== ${user.id},${checkAmount(funds)},${user.csCardToken},${ltoken}`;
          NfcManager.start();
          const bytes = Ndef.encodeMessage([Ndef.mimeMediaRecord(mimeType, data)]);
          NfcManager.setNdefPushMessage(bytes).then(() =>
              Alert.alert(`Send $${checkAmount(funds)}`),
          );
        })
      },

  _senLink = code => {
    NfcManager.start();
    const bytes = Ndef.encodeMessage([Ndef.uriRecord(`${url}/${code}`)]);
    NfcManager.setNdefPushMessage(bytes);
  },

  _dispatchTransactionDelay = () => {
      dispatch(
        transactionDelay({
          guid: defaultCardNumber.guid,
          sum: checkAmount(funds),
        }),
      );
    },

  _selectSendType = () => {
      Alert.alert('', 'Does the receiver have an app?', [
        {
          text: 'Yes',
          onPress: _sentNFCdata,
        },
        {
          text: 'No',
          onPress: _dispatchTransactionDelay,
        },

      ]);
    };

  // useEffect( async () => {
  //   const stoken = await AsyncStorage.getItem('token');
  //   setLToken(stoken)
  // },[]) 

  const  sendingData = () => {
      if (Platform.OS === 'ios') {
          return _sendNearByData()
      } else {
          return _selectSendType();
      }
  }

  useEffect(() => {
      nearbyAPI.connect(API_NEARBY_KEY);
      
    // dispatch(getCardInfoData(defaultCardNumber.guid));
  }, []);

  useEffect(() => {
    transactionCode &&
      (_senLink(transactionCode), dispatch(transactionDelayClear()));
  }, [loading]);

  return (
    <View style={styles.wrapper}>
      <MainHeader title={headerTitle.SendPayment} />
      <ScrollView>
        <Wrapper>
          <View style={styles.imageStyle}>
            <Image source={nfc_icon} style={{marginLeft: 60}} />
            <Text h3>Hold near or tap Receiver's phone</Text>
          </View>
          <Card
            titleStyle={{color: 'grey'}}
            containerStyle={style.SendFundsScreen.containerStyle}
            title={
              !_.isEmpty(cards) && "**** **** **** " +cards[0].last4Digits
            }
            image={visa_send}>
            <View style={style.SendFundsScreen.inputWrapper}>
              <Text h1>{"$"+checkAmount(funds)}</Text>
            </View>
            <View style={style.SendFundsScreen.buttonsStyle}>
              <CanShowSendBtn showSendBtn={showSendBtn} sendingData={sendingData} />
              <Button title="Cancel" onPress={() => navigation.goBack()} />
            </View>
          </Card>
        </Wrapper>
      </ScrollView>
    </View>
  );
};

const CanShowSendBtn = (props) => {
  const [showSend, setShowSend] = useState(true)

  useEffect( () => {
    setShowSend(true)
  }, [props])

  if (!showSend) {
    return(<View title="" />)
  } else {
    return(<Button title="Send" onPress={() => {
      setShowSend(false)
      props.sendingData()
    }} />)
  }
  
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: 'white',
  },
  imageStyle: {
    padding: 5,
    width: '90%',
    alignItems: 'center',
  },
});
export default SendTransaction;
