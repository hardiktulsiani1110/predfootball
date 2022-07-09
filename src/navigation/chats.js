/* eslint-disable prettier/prettier */
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import ChatsScreen from '../screens/chat/ChatsScreen';
import ChatScreen from '../screens/chat/ChatScreen';
import CreateGroupScreen from '../screens/chat/CreateGroupScreen';
import ShareInviteScreen from '../screens/chat/ShareInviteScreen';
import ViewMembersScreen from '../screens/chat/ViewMembersScreen';
import JoinGroupScreen from '../screens/chat/JoinGroupScreen';
import ViewPredictionsScreen from '../screens/chat/ViewPredictionsScreen';
import ViewMemberPredictionsScreen from '../screens/chat/ViewMemberPredictionsScreen';
const Stack = createNativeStackNavigator();

function ChatsNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Chats"
        component={ChatsScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CreateGroup"
        component={CreateGroupScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Chat"
        component={ChatScreen}
        // options={({navigation, route}) => ({
        //   title: route.params.groupName,
        // })}
      />
      <Stack.Screen
        name="JoinGroup"
        component={JoinGroupScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ViewMembers"
        component={ViewMembersScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ViewPredictions"
        component={ViewPredictionsScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ViewMemberPredictions"
        component={ViewMemberPredictionsScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ShareInvite"
        component={ShareInviteScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export default ChatsNavigator;
