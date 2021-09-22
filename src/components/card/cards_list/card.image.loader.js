import React from 'react';
import {Image} from 'react-native-elements';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {ActivityIndicator} from 'react-native';
import {colors} from '../../../styles/colors';

export default props => {
  return (
    <Image
      {...props}
      style={styles.ListItem.imgStyle}
      PlaceholderContent={<ActivityIndicator />}
      placeholderStyle={{backgroundColor: colors.white}}
    />
  );
};
const styles = {
  ListItem: {
    imgStyle: {
      width: wp('30%'),
      height: hp('10%'),
    },
  },
};
