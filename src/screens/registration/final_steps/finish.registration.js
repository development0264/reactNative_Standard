import React from 'react';
import {View, Image} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import Wrapper from '../../../components /ui/wrapper';
import Title from '../../../components /ui/title';
import {Button} from 'react-native-elements';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {finishImgData as data} from '../../../config/data';
import {
  dashBoardNavigator as navigator,
  registrationSteps as registration,
} from '../../../navigation/screen.names';
import {main} from '../../../styles/main';
const styles = main.presentationStyle;
/**
 * Final page with carousel before user start add card
 * @param navigate
 * @returns {*}
 */
const FinishRegistration = ({navigation: {navigate}}) => {
  const handleSubmit = () =>
      navigate(registration.Home, {screen: navigator.Main}),
    renderItem = ({item: {img}}) => (
      <View style={styles.renderItemStyle}>
        <Image source={img} style={styles.imgStyle} resizeMode="contain" />
      </View>
    );
  return (
    <Wrapper>
      <View style={styles.container}>
        <Title text="Add Card" title="Finish Registration" />
        <Carousel
          inactiveSlideOpacity={10}
          inactiveSlideScale={0}
          sliderWidth={wp('100%')}
          itemWidth={wp('95%')}
          initialNumToRender={0}
          slideStyle={{marginTop: wp('3%')}}
          firstItem={1}
          data={data}
          renderItem={renderItem}
          itemHeight={350}
        />
        <Button onPress={() => handleSubmit()} title="Add Card" />
      </View>
    </Wrapper>
  );
};
export default FinishRegistration;
