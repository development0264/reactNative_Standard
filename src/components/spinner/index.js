import React from 'react';
import Wrapper from '../ui/wrapper';
import {ActivityIndicator, Text} from 'react-native';
const SplashScreen = () => (
  <Wrapper>
    <ActivityIndicator size="large" color="grey" />
    <Text>Loading...</Text>
  </Wrapper>
);
export default SplashScreen;
