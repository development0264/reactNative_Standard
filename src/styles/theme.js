import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Font} from '../config/data';
import {colors} from './colors';

const theme = {
  Button: {
    buttonStyle: {
      width: wp('25%'),
      borderWidth: 1,
      borderColor: colors.grey,
      backgroundColor: colors.white,
      marginTop: hp('3%'),
      borderRadius: 10,
      marginLeft: wp('2%'),
    },
    titleStyle: {
      color: colors.grey,
      fontFamily: Font.Helvetica,
      fontSize: wp('4%'),
    },
    loadingProps: {
      color: colors.grey,
    },
  },
  Input: {
    containerStyle: {
      marginTop: hp('2%'),
    },
    inputContainerStyle: {
      borderBottomWidth: 0,
    },
    labelStyle: {
      paddingLeft: 10,
      fontFamily: Font.Helvetica,
      fontWeight: 'normal',
      color: colors.grey,
    },
    inputStyle: {
      borderWidth: 1,
      borderRadius: 10,
      borderColor: 'grey',
      paddingLeft: 10,
      fontFamily: Font.Helvetica,
    },
  },
  Text: {
    h1Style: {
      color: 'black',
      fontSize: 35,
      fontWeight: '700',
      marginBottom: hp('1%'),
      fontFamily: Font.Helvetica,
    },
    h3Style: {
      color: 'grey',
      fontSize: 17,
      fontWeight: '300',
      fontFamily: Font.Helvetica,
    },
    h4Style: {
      color: 'grey',
      fontSize: 15,
      fontWeight: '300',
      fontFamily: Font.Helvetica,
    },
  },
  Header: {
    backgroundColor: 'white',
  },
  PricingCard: {
    containerStyle: {
      height: hp('20'),
    },
  },
};

export default theme;
