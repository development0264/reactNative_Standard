import React, {useEffect, useState} from 'react';
import {TextInput, View, Keyboard} from 'react-native';
import {Text} from 'react-native-elements';
import {TouchableOpacity} from 'react-native';
import MainHeader from '../../../components /ui/header';
import {data} from '../../../config/data';
import {main} from '../../../styles/main';
import {selectedFunds} from '../../../store /user/card/select_funds/data';
import {useDispatch} from 'react-redux';
import {dashBoardNavigator as navigator} from '../../../navigation/screen.names';
import {headerTitle} from '../../../config/texts';
import {getCardsData} from '../../../store /user/card/cards_all/actions'

import {store} from '../../../store /store';
const {dispatch,getState} = store;
/**
 * Main page for user where user can select summary  to send
 * @return {*}
 */
const Dashboard = ({navigation}) => {
  const [newData, setData] = useState('$0'),
    styles = main.userDashboardStyle,
    dispatch = useDispatch(),
    handleChange = id => {
      setData(data[id].title);
      dispatch(selectedFunds(data[id].title));
      navigation.navigate(navigator.SendPayment,{showSend: true});
    },
    handleClick = () => {
      dispatch(selectedFunds({title: ""}));
      navigation.navigate(navigator.SendPayment,{showSend: true});
    },
      handleChangeText= text => {
          setData(text)
      }
  useEffect(()=>{
    let user = getState().USER_INFO_DATA.data
    dispatch(getCardsData(user.csCardToken));
  },[])
  return (
    <>
      <MainHeader title={headerTitle.Main} />
      <View style={styles.wrapperStyle}>
          <Text style={styles.h1Style}>Enter amount</Text>
          <TouchableOpacity style={{width:"100%",alignItems:"center",justifyContent:"center"}}  onPress={
              ()=>(dispatch(selectedFunds(newData),navigation.navigate(navigator.SendPayment, {showSend: true})))}>

        <TextInput
            value={newData}
            style={[styles.titleStyle,styles.h1Style]}
            onChangeText={text=>handleChangeText(text)}
            textAlign='center'
            keyboardType="decimal-pad"
            returnKeyType={"done"}
            onSubmitEditing={(event) => { Keyboard.dismiss(); }}
        />
              { newData!=='$0'  && newData!=='$'  && <Text h3>Click here to Pay</Text> }
              </TouchableOpacity >
          <Text style={styles.h1Style}>or</Text>
        <View style={styles.viewStyle}>
          <Text h3>Tap to Be$tow</Text>
          {data.map((el, index) => (
            <TouchableOpacity
              onPress={() => handleChange(index)}
              key={index}
              style={styles.blockStyle}>
              <Text style={styles.textStyle}>
                {el.title} {el.text}
              </Text>
            </TouchableOpacity>
          ))}
          {/*<TouchableOpacity*/}
          {/*  onPress={() => handleClick()}*/}
          {/*  style={styles.blockStyle}>*/}
          {/*  <Text style={styles.textStyle}>Other Sum</Text>*/}
          {/*</TouchableOpacity>*/}
        </View>
      </View>
    </>
  );
};
export default Dashboard;
