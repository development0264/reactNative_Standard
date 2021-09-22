import { AppRegistry, View, Text, Button } from 'react-native';
import React from 'react';
const AppClip = () => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',height:300 }}>
        <Text style={{ fontSize: 22 }}>
            App Clip
        </Text>
        <Button
            title="Learn More"
            color="#841584"
        />
    </View>
);

AppRegistry.registerComponent('AppClip', () => AppClip);