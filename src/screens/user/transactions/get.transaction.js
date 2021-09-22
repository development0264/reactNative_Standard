import React, {useState, useEffect, useRef} from 'react';
import {Text} from 'react-native-elements';
import Wrapper from '../../../components /ui/wrapper';
import MainHeader from '../../../components /ui/header';
import NfcManager, {Ndef, NfcEvents, NfcTech} from 'react-native-nfc-manager';
import {PulseIndicator} from 'react-native-indicators';
import {Alert, Platform, View} from 'react-native';
import _ from 'lodash';
import {useDispatch, useSelector} from 'react-redux';
import {
  transactionInitRefresh,
  transactionSend,
} from '../../../store /user/transactions/actions';
import {headerTitle} from '../../../config/texts';
import {store} from '../../../store /store';
import {
  NfcBackground,
  NfcBackgroundClear,
} from '../../../store /user/card/select_funds/data';
import {NearbyAPI} from '@adrianso/react-native-nearby-api';
import {API_NEARBY_KEY} from '../../../config/data';
import DropdownAlert from "react-native-dropdownalert";
import UUIDGenerator from 'react-native-uuid-generator';

const {dispatch,getState} = store;
/**
 * Get Funds screen send data with NFC
 * @return {*}
 */
const nearbyAPI = new NearbyAPI(true);
nearbyAPI.connect(API_NEARBY_KEY);
const GetTransaction = () => {
  const funds = useSelector(e => e.SELECTED_FUNDS_DATA.obj),
    // [text, setText] = useState(null),
    // [message, setMessage] = useState(null),
    // dispatch = useDispatch(),
    // {cards} = useSelector(r => r.CARD_DATA),
    //   user = useSelector(r => r.USER_INFO_DATA.data),
    {data, loading} = useSelector(r => r.TRANSACTION_DATA);
    // nearbyAPI = new NearbyAPI(true);
    // const   _getNearByData =  () => {
    //       nearbyAPI.connect(API_NEARBY_KEY)
    //       nearbyAPI.subscribe();
    //       nearbyAPI.onFound(message => {
    //           if(message!=null)
    //           {
    //               const array = String(message).split(',');
    //               dispatch(
    //                   transactionSend({
    //                       sender: Number(array[0]),
    //                       amount: Number(array[1] * 100),
    //                       receiver: user.id,
    //                   }),
    //               );
    //               nearbyAPI.unsubscribe()
    //               setTimeout(()=>_getNearByData(),3000)
    //           }
    //       });
    //   },
    // _readTagEvent = async () => {
    //   if (Platform.OS === 'android') {
    //    await _getNearByData();
    //     NfcManager.start();
    //     NfcManager.registerTagEvent(NfcTech.Ndef);
    //     NfcManager.setEventListener(
    //       NfcEvents.DiscoverTag,
    //       ({ndefMessage: [{payload}]}) => {
    //         const [{type}] = Ndef.decodeMessage(payload);
    //         const array = String(type).split(',');
    //         setText({sender: array[0], amount: Number(array[1])**100});
    //       },
    //     );
    //   } else {
    //    await _getNearByData()
    //   }
    // },

    // _sendTransactionData = () => {
    //   // if (text!==null) {
    //   //   dispatch(
    //   //     transactionSend({
    //   //       ...text,
    //   //         receiver: user.id,
    //   //     }),
    //   //   );
    //   // }
    // },

    // _cleanUpStateEvents = () => {
    //   dispatch(transactionInitRefresh());
    //   setText(null);
    // };


  // useEffect(() => {
  //   // Platform.OS === 'ios'
  //   //   ? nearbyAPI.connect(API_NEARBY_KEY)
  //   //   : nearbyAPI.connect();
  //   // setTimeout(_readTagEvent, 5000);
  //
  // },[]);
  // useEffect(_sendTransactionData, [text]);
  // useEffect(() => {
  //   // !_.isEmpty(data) &&
  //   //   (Alert.alert(`Transaction was success!`),
  //   //   _cleanUpStateEvents())
  //   //   // dispatch(NfcBackgroundClear()),
  // }, [loading]);


  return (
    <>
      <MainHeader title={headerTitle.GetPayments} />
      <Wrapper>
        {!loading && (
          <View style={{height: 200}}>
            <PulseIndicator size={80} color="grey" />
            <Text h3 h1Style={{color: 'grey'}}>
              Waiting for get funds...
            </Text>
          </View>
        )}
      </Wrapper>
    </>
  );
};
export default GetTransaction;
export const _readTagEventBackground = () => {
    const user = getState().USER_INFO_DATA.data
    NfcManager.start();
  NfcManager.registerTagEvent();
  NfcManager.setEventListener(
    NfcEvents.DiscoverTag,
    ({ndefMessage: [{payload}]}) => {
      const [{type}] = Ndef.decodeMessage(payload);
      const array = String(type).split(',');
      UUIDGenerator.getRandomUUID().then((uuid) => {
        dispatch(transactionSend(
            {
                requestId: uuid,
                sender: Number(array[0]),
                amount: Number(array[1]*100),
                receiver: user.id,
                cardToken: array[2],
                token: array[3],
                receiver: user.id,
            })
        );
      })
    },
  );
  NearByBackGroundEvent()
};
export const NearByBackGroundEvent = () => {
    nearbyAPI.subscribe();
    nearbyAPI.onFound(message => {
        if(message!=null)
        {
            const user = getState().USER_INFO_DATA.data
            const array = String(message).split(',');
            UUIDGenerator.getRandomUUID().then((uuid) => {
              dispatch(
                  transactionSend({
                      requestId: uuid,
                      sender: Number(array[0]),
                      amount: Number(array[1] * 100),
                      cardToken: array[2],
                      token: array[3],
                      receiver: user.id,
                  }),
              );
            })
            nearbyAPI.unsubscribe()
            setTimeout(()=>NearByBackGroundEvent(),2000)
        }
    });
}
