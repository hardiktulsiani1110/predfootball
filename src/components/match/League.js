/* eslint-disable prettier/prettier */
import React from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import Match from './Match';

const renderItem = itemData => {
  return <Match match={itemData.item} />;
};

const League = ({matches}) => {
  const navigation = useNavigation();

  const tableScreenHandler = () => {
    if (matches[0]?.league?.id == 2) {
      return navigation.push('UCLTable', {
        leagueName: matches[0]?.league?.name,
        leagueId: matches[0]?.league?.id,
        season: matches[0]?.league?.season,
      });
    }
    return navigation.push('Table', {
      leagueName: matches[0]?.league?.name,
      leagueId: matches[0]?.league?.id,
      season: matches[0]?.league?.season,
    });
  };

  if (matches.length <= 0) {
    return <View></View>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Text style={styles.logoText}>{matches[0]?.league?.name}</Text>
        <Text style={styles.matchday}>
          MatchDay {matches[0]?.league?.round?.slice(-2)}
        </Text>
      </View>
      <FlatList
        data={matches}
        keyExtractor={item => item?.fixture?.id}
        renderItem={renderItem}
      />
      <TouchableOpacity style={styles.table} onPress={tableScreenHandler}>
        <Text style={styles.tableText}>See Table</Text>
      </TouchableOpacity>
    </View>
  );
};

export default League;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#3e3c42',
    marginBottom: 40,
  },
  logo: {
    alignItems: 'center',
    marginBottom: 10,
  },
  logoText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  matchday: {
    fontSize: 14,
    color: 'white',
  },
  table: {
    alignItems: 'center',
    height: 40,
    paddingBottom: 10,
    paddingTop: 10,
  },
  tableText: {
    color: 'white',
    fontSize: 16,
  },
});
