import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {colors} from './colors';
import {Font} from '../config/data';
import {Platform} from 'react-native';
const borderForIos = Platform.OS === 'ios' && {
  borderBottomColor: colors.grey,
  zIndex: 1,
};
export const main = {
  loginPageStyle: {
    container: {
      width: wp('90%'),
      marginTop: hp('3%'),
    },
    errorMessage: {
      marginLeft: wp('5%'),
      color: colors.red,
      fontSize: wp('3%'),
      alignSelf: 'center',
      paddingBottom: hp('1%'),
    },
    
  },
  cardRegisterPageStyle: {
    container: {
      width: wp('92%'),
      marginTop: hp('3%'),
      paddingBottom: 60
    },
    horizontalPad: {
      marginLeft: wp('4%'),
    }
  },
  sameStyle: {
    container: {
      width: wp('90%'),
      marginTop: hp('3%'),
    },
    errorMessage: {
      marginLeft: wp('2%'),
      color: colors.red,
    },
  },
  passwordConfirm: {
    container: {
      alignSelf: 'flex-start',
      width: '90%',
      marginLeft: wp('5%'),
    },
  },
  emailCreate: {
    buttonsStyle: {
      width: '97%',
      justifyContent: 'space-between',
      flexDirection: 'row',
    },
  },
  emailConfirm: {
    container: {
      alignSelf: 'flex-start',
      width: '90%',
      marginLeft: wp('5%'),
    },
  },
  phoneStyle: {
    width: '95%',
    borderBottomWidth: 0.6,
    paddingVertical: hp('1%'),
    fontSize: wp('5'),
    marginHorizontal: wp('2%'),
    color: colors.black,
    fontFamily: Font.Helvetica,
  },
  loginPhoneStyle: {
    phoneStyle: {
      width: '98%',
      borderBottomWidth: 0,
      paddingVertical: hp('1%'),
      fontSize: wp('5%'),
      color: colors.black,
      paddingLeft: wp('4%'),
      fontFamily: Font.Helvetica,
    },
    containerStyle: {
      flexDirection: 'row',
      width: '95%',
      alignItems: 'center',
      borderWidth: 1,
      borderRadius: 10,
      marginLeft: wp('2%'),
      justifyContent: 'flex-start',
      height: Platform.OS === 'ios' ? hp('5%') : hp('6%'),
    },
    iconStyle: {
      padding: Platform.OS === 'ios' ? hp('1%') : hp('1.6%'),
      fontFamily: Font.Helvetica,
      borderRadius: 3,
    },
    placeholderStyle: {
      flex: 2,
      position: 'absolute',
      backgroundColor: colors.white,
      color: colors.grey,
      zIndex: 1,
      fontSize: 15,
      fontFamily: Font.Helvetica,
      bottom: Platform.OS === 'ios' ? hp('3.3%') : hp('-1.3%'),
      left: Platform.OS === 'ios' ? wp('3%') : wp('5%'),
      paddingLeft: wp('1%'),
      paddingRight: wp('1%'),
      textAlign: 'center',
    },
  },
  DrawerStyle: {
    drawerContent: {
      flex: 1,
    },
    userInfoSection: {
      paddingLeft: wp('5%'),
      paddingTop: wp('5%'),
      fontFamily: Font.Helvetica,
    },
    title: {
      marginTop: hp('1%'),
      fontFamily: Font.Helvetica,
    },
    caption: {
      fontSize: wp('3%'),
      lineHeight: hp('4%'),
    },
    row: {
      marginTop: hp('5%'),
      flexDirection: 'row',
      alignItems: 'center',
    },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: wp('5%'),
    },
    paragraph: {
      fontFamily: Font.Helvetica,
      fontWeight: 'bold',
      marginRight: 3,
    },
    drawerSection: {
      marginTop: hp('4%'),
      fontFamily: Font.Helvetica,
    },
    preference: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: wp('2%'),
      paddingHorizontal: wp('3%'),
    },
  },
  cardStyle: {
    container: {
      backgroundColor: '#fff',
      borderBottomWidth: 0.3,
      borderBottomColor: colors.grey,
      paddingTop: 10,
      fontFamily: Font.Helvetica,
    },
    label: {
      fontFamily: Font.Helvetica,
      color: colors.black,
      fontSize: wp('3%'),
    },
    input: {
      fontFamily: Font.Helvetica,
      fontSize: wp('4%'),
      color: colors.black,
    },
    mix: {
      container: {
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        borderBottomWidth: 0.5,
        fontFamily: Font.Helvetica,
        borderBottomColor: colors.grey,
        width: '95%',
        height: 40,
      },
      formStyle: {
        width: '95%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        alignSelf: 'center',
        marginBottom: 5,
      },
      titleStyle: {
        alignSelf: 'center',
        color: colors.grey,
        fontFamily: Font.Helvetica,
      },
      buttonStyle: {
        paddingBottom: 10,
        justifyContent: 'flex-start',
        width: '96%',
      },
      textStyle: {
        fontFamily: Font.Helvetica,
        fontWeight: 'bold',
        fontSize: 12,
      },
      checkBoxStyle: {
        width: 200,
        backgroundColor: colors.white,
        borderWidth: 0,
      },
    },
  },
  Notification: {
    container: {
      backgroundColor: 'black',
      height: hp('10%'),
      alignItems: 'center',
      justifyContent: 'center',
    },
    textStyle: {
      fontFamily: Font.Helvetica,
      color: colors.white,
    },
  },
  MainHeader: {
    header: {
      backgroundColor: colors.white,
      ...borderForIos,
    },
    content: {
      fontSize: wp('8%'),
      alignSelf: 'center',
      marginRight: Platform.OS === 'ios' ? wp('0%') : wp('12%'),
      color: colors.grey,
      fontFamily: Font.Helvetica,
    },
    size: wp('8%'),
    height: Platform.OS === 'ios' ? hp('4%') : hp('1%'),
  },
  userDashboardStyle: {
    blockStyle: {
      borderWidth: 1,
      borderColor: colors.grey,
      padding: 10,
      width: 300,
      margin: 10,
      borderRadius: 50,
      justifyContent: 'center',
      alignItems: 'center',
    },
    titleStyle: {
      borderWidth: 2,
      fontFamily: Font.Helvetica,
      borderColor: colors.grey,
      padding: 5,
      width: 300,
      marginTop: 50,
      margin: 10,
      borderRadius: 50,
      justifyContent: 'center',
      alignItems: 'center',
    },
    textStyle: {
      fontFamily: Font.Helvetica,
      fontSize: 19,
      color: colors.grey,
    },
    viewStyle: {
      justifyContent: 'flex-start',
      alignItems: 'center',
      height: '100%',
    },
    h1Style: {
      fontFamily: Font.Helvetica,
      fontSize: 34,
      color: colors.black,
    },
    wrapperStyle: {
      fontFamily: Font.Helvetica,
      backgroundColor: colors.white,
      alignItems: 'center',
    },
  },
  presentationStyle: {
    container: {
      height: 520,
    },
    renderItemStyle: {
      width: wp('90%'),
      height: 350,
      borderWidth: 2,
      marginLeft: 10,
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: colors.grey,
      fontFamily: Font.Helvetica,
      borderRadius: 10,
    },
    imgStyle: {
      width: wp('80%'),
      height: 350,
      flex: 1,
    },
  },
  SendFundsScreen: {
    containerStyle: {
      borderRadius: 10,
      marginBottom: 10,
      borderWidth: 0,
      borderColor: colors.grey,
      width: '80%',
    },
    inputWrapper: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    inputStyle: {
      width: 90,
      borderWidth: 1,
      height: 45,
      fontSize: 20,
      borderRadius: 10,
      paddingLeft: 10,
      borderColor: colors.grey,
      fontFamily: Font.Helvetica,
    },
    buttonsStyle: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
  },
  CardsItemHistory: {
    icon: {
      position: 'absolute',
      top: Platform.OS === 'ios' ? wp('-2%') : wp('2%'),
      right: wp('3%'),
      width: wp('20%'),
      height: hp('10%'),
      resizeMode: 'contain',
    },
    baseText: {
      color: 'rgba(255, 255, 255, 0.8)',
      backgroundColor: 'transparent',
      fontFamily: Font.Helvetica,
    },
    placeholder: {
      color: 'rgba(255, 255, 255, 0.5)',
      fontFamily: Font.Helvetica,
    },
    focused: {
      fontWeight: 'bold',
      color: 'rgba(255, 255, 255, 1)',
      fontFamily: Font.Helvetica,
    },
    number: {
      fontSize: wp('7%'),
      position: 'absolute',
      top: Platform.OS === 'ios' ? hp('10%') : hp('15%'),
      left: wp('5%'),
    },
    name: {
      fontSize: 36,
      position: 'absolute',
      bottom: 20,
      left: 25,
      right: 100,
    },
    expiryLabel: {
      fontSize: 9,
      position: 'absolute',
      bottom: hp('6%'),
      left: wp('65%'),
    },
    expiry: {
      fontSize: 16,
      position: 'absolute',
      bottom: hp('3%'),
      left: wp('67%'),
    },
    containerView: {
      alignItems: 'center',
      width: '100%',
      justifyContent: 'center',
      backgroundColor: colors.white,
      borderBottomColor: colors.grey,
      fontFamily: Font.Helvetica,
      height: Platform.OS === 'ios' ? hp('34%') : hp('38%'),
    },
    imageStyle: {
      width: wp('90%'),
      height: Platform.OS === 'ios' ? hp('25%') : hp('33%'),
      alignSelf: 'center',
    },
  },
  Title: {
    container: {
      width: '90%',
      justifyContent: 'flex-start',
      marginLeft: wp('5%'),
    },
    titleTextStyle: {
      fontSize: wp('9%'),
      fontFamily: Font.Helvetica,
      paddingBottom: 10,
    },
    textStyle: {
      fontSize: wp('4%'),
      color: 'grey',
      fontFamily: Font.Helvetica,
    },
  },
  CardItemList: {
    container: {
      width: '98%',
      alignSelf: 'center',
      padding: 10,
      fontFamily: Font.Helvetica,
    },
  },
  AnonymousScreen: {
    containerStyle: {
      width: '90%',
      backgroundColor: colors.white,
      marginVertical: 10,
      borderWidth: 0,
    },
    box: {
      justifyContent: 'flex-start',
      width: '90%',
    },
  },
  FinishPageScreen: {
    container: {
      height: 520,
    },
    renderItemStyle: {
      width: wp('90%'),
      height: 350,
      borderWidth: 2,
      marginLeft: 10,
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: 'grey',
      borderRadius: 10,
    },
    imgStyle: {
      width: wp('80%'),
      height: 350,
      flex: 1,
    },
  },
  HelperText: {
    container: {
      width: '90%',
      justifyContent: 'flex-start',
      marginLeft: wp('5%'),
      marginTop: hp('5%'),
    },
  },
  ScreenWrapper: {
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.white,
    },
  },
  ProfileSettings: {
    bottomWrapper:{
      paddingBottom: 15,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '97%',
    },
    switcherEdit :{
      alignItems: 'center', paddingTop: 10
    },
    checkBoxStyle : {
      width: 250,
      backgroundColor: 'white',
      borderWidth: 0,
    },
    formWrapper: {
        borderWidth: 1,
        borderColor: 'grey',
        borderRadius: 10,
        paddingBottom: 10,
    },
    profileWrapper : {
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: '100%',
    }
  }
};
