/* eslint-disable prettier/prettier */
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import MatchesNavigator from './matches.js';
import ChatsNavigator from './chats.js';

const Tab = createBottomTabNavigator();

function MatchesChatsNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: 'white',
        tabBarInActiveTintColor: 'white',
        tabBarStyle: {backgroundColor: '#3e3c42'},
      }}>
      <Tab.Screen
        name="MatchesTab"
        options={{
          tabBarLabel: 'Matches',
          tabBarLabelStyle: {fontSize: 15},
          tabBarIcon: () => (
            <MaterialCommunityIcons
              name="soccer-field"
              size={24}
              color="white"
            />
          ),
        }}
        component={MatchesNavigator}
      />
      <Tab.Screen
        name="ChatsTab"
        options={{
          tabBarLabel: 'Chats',
          tabBarLabelStyle: {fontSize: 15},
          tabBarIcon: () => (
            <MaterialCommunityIcons
              name="chat-outline"
              size={24}
              color="white"
            />
          ),
        }}
        component={ChatsNavigator}
      />
    </Tab.Navigator>
  );
}

export default MatchesChatsNavigator;
