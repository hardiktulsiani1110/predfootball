/* eslint-disable prettier/prettier */
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import MatchesChatsNavigator from './matches-chats';
import AuthNavigator from './auth';
import StartupScreen from '../screens/StartupScreen';

const Stack = createNativeStackNavigator();

function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Startup" component={StartupScreen} />
        <Stack.Screen name="Auth" component={AuthNavigator} />
        <Stack.Screen name="MatchesChats" component={MatchesChatsNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
