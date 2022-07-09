/* eslint-disable prettier/prettier */
import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import OverviewScreen from '../screens/match/OverviewScreen';
import LineupsScreen from '../screens/match/LineupsScreen';
import StatsScreen from '../screens/match/StatsScreen';

const Tab = createMaterialTopTabNavigator();

function FixtureNavigator({route}) {
  // const {id, team1, team2} = route.params;
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: 'white',
        tabBarInActiveTintColor: 'white',
        tabBarStyle: {backgroundColor: '#3e3c42'},
        lazy: true,
      }}>
      <Tab.Screen
        name="Overview"
        component={OverviewScreen}
        initialParams={route.params}
        // options={{lazy: true}}
      />
      <Tab.Screen
        name="Lineups"
        component={LineupsScreen}
        initialParams={route.params}
        // options={{lazy: true}}
      />
      <Tab.Screen
        name="Stats"
        component={StatsScreen}
        initialParams={route.params}
        // options={{lazy: true}}
      />
    </Tab.Navigator>
  );
}

export default FixtureNavigator;
