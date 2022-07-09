/* eslint-disable prettier/prettier */
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import AllMatchesScreen from '../screens/match/AllMatchesScreen';
import TableScreen from '../screens/match/TableScreen';
import UCLTableScreen from '../screens/match/UCLTableScreen';
import FixtureNavigator from './fixture';

const Stack = createNativeStackNavigator();

function MatchesNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AllMatches"
        component={AllMatchesScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen name="UCLTable" component={UCLTableScreen} />
      <Stack.Screen name="Table" component={TableScreen} />
      <Stack.Screen name="Fixture" component={FixtureNavigator} />
    </Stack.Navigator>
  );
}

export default MatchesNavigator;
