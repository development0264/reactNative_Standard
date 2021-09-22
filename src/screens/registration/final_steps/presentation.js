import React, {useEffect} from 'react';
import {View, Image} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import Wrapper from '../../../components /ui/wrapper';
import Title from '../../../components /ui/title';
import {Button} from 'react-native-elements';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-community/async-storage';
import {imgData as data} from '../../../config/data';
import {main} from '../../../styles/main';
import {registrationSteps as navigator} from '../../../navigation/screen.names';
const style = main.presentationStyle;
/**
 * Presentation page fro user with carousel
 * @param navigate
 * @returns {*}
 */
const Presentation = ({navigation: {navigate}}) => {
  const renderItem = ({item: {img}}) => (
      <View style={style.renderItemStyle}>
        <Image source={img} style={style.imgStyle} resizeMode="contain" />
      </View>
    ),
    effect = async () => {
      const token = await AsyncStorage.getItem('reg_token');
      await AsyncStorage.setItem('token', token);
    };
  useEffect(() => {
    effect();
  }, []);

  return (
    <Wrapper>
      <View style={style.container}>
        <Title text="Instructions" title="Almost Finish" />
        <Carousel
          inactiveSlideOpacity={10}
          inactiveSlideScale={0}
          sliderWidth={wp('100%')}
          itemWidth={wp('95%')}
          initialNumToRender={0}
          slideStyle={{marginTop: 20}}
          firstItem={1}
          data={data}
          renderItem={renderItem}
          itemHeight={300}
        />
        <Button title="Next" onPress={() => navigate(navigator.Finish)} />
      </View>
    </Wrapper>
  );
};
export default Presentation;
