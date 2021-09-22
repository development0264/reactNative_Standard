import React, {useEffect, useState} from 'react';
import MainHeader from '../../../components /ui/header';
import {useDispatch} from 'react-redux';
import SplashScreen from '../../../components /spinner';
import {convert} from '../../../utils/payment_card.util';
import axios from 'axios';
import moment from 'moment';
import {data, statuses, icons} from '../../../config/transactios.types';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import {TRANSACTION_ID_URL,CROSS_RIVER_TOKEN_URL} from '../../../routes';

import {store} from '../../../store /store';
const {getState} = store;

const styles = StyleSheet.create({
  parent: {
    width: "90%",
    flex: 1,
    marginLeft: "4%"
  },
  parentPad: {
    paddingTop: 30,
  },
  centerAlign: {
    alignItems: "center",
    justifyContent: "center"
  },
  textHigh: {
    fontSize: 16,
    color: "black"
  },
  textLow: {
    fontSize: 14,
    color: "black"
  },
  fontBold: {
    fontWeight: 'bold',
  },
  flexerRow: {
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 10
  }
})

const TransactionHistoryDetails = ({route}) => {

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [idRes, setIdRes] = useState({})
  const [transactionItem, setTransactionItem] = useState(route.params.item)

  useEffect(() => {
    let transactionId = route.params.transacId

    axios.post(CROSS_RIVER_TOKEN_URL, {
      "username":"ptpeBSTstgClient",
      "password":"d19c2e100865400f9849d903972218dc"
    }).then(tres => {
      if(tres.data.access_token) {
        axios.defaults.headers.common['Token'] = `${tres.data.access_token}`;
        axios
        .get(TRANSACTION_ID_URL+"/"+transactionId)
        .then(res =>{
          if (res.data && res.data.result) {
            setIdRes(res.data.result)
            setError(false)
            setLoading(false)
          } else {
            setError(true)
            setLoading(false)
          }
        })
        .catch(err => {
          setError(true)
          setLoading(false)
        });
      } else {
        setError(true)
        setLoading(false)
      }
    }).catch(err => {
      setError(true)
      setLoading(false)
    })
  },[]);

  const renderCard = () => {
    if (error) {
      return(
      <View style={[styles.parent,styles.centerAlign]}>
        <Text style={styles.textHigh}>Sorry, No Transaction Details Available</Text>
        <Text style={styles.textLow}>Please Try again.</Text>
      </View>
      )
    }
    return(
      <ScrollView style={styles.parent} showsVerticalScrollIndicator={false}>
        <View style={[styles.parent, styles.parentPad]}>
          <View style={styles.flexerRow}>
            <Text style={[styles.fontBold, styles.textHigh]}>Transaction Amount : </Text>
            <Text style={[styles.textHigh, {color: data[transactionItem.type]}]}>{` $${convert(transactionItem.amount)/100}`}</Text>
          </View>
          <View style={styles.flexerRow}>
            <Text style={[styles.fontBold, styles.textHigh]}>Network : </Text>
            <Text style={styles.textHigh}>{idRes.network}</Text>
          </View>
          <View style={styles.flexerRow}>
            <Text style={[styles.fontBold, styles.textHigh]}>Created At : </Text>
            <Text style={styles.textHigh}>{moment(idRes.actualTransactionDoneAt).utc().local().format('MMMM DD YYYY, h:mm:ss a')}</Text>
          </View>
          <View style={styles.flexerRow}>
            <Text style={[styles.fontBold, styles.textHigh]}>Transaction Status : </Text>
            <Text style={styles.textHigh}>{idRes.transactionStatus}</Text>
          </View>
          </View>
      </ScrollView>
    )
  }

  return (
    <>
      <MainHeader title="Details" />
      {loading ? <SplashScreen /> : renderCard()}
    </>
  );
};
export default TransactionHistoryDetails;