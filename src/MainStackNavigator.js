import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import ChatScreen from './screens/ChatScreen';
import HomeScreen from './screens/HomeScreen';

const Stack = createStackNavigator();

export default () => (
  <NavigationContainer theme={{colors: {background: '#4b1380'}}}>
    <Stack.Navigator
      screenOptions={{
        headerBackTitle: '',
      }}>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{header: () => null}}
      />
      <Stack.Screen
        name="ChatScreen"
        component={ChatScreen}
        options={{header: () => null}}
      />
    </Stack.Navigator>
  </NavigationContainer>
);
