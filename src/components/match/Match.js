/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';

const Match = ({match}) => {
  const navigation = useNavigation();
  const [nullValue, setNullValue] = useState();
  const [time, setTime] = useState(null);
  useEffect(() => {
    if (
      match?.fixture?.status?.short == '1H' ||
      match?.fixture?.status?.short == 'HT' ||
      match?.fixture?.status?.short == '2H' ||
      match?.fixture?.status?.short == 'ET' ||
      match?.fixture?.status?.short == 'P' ||
      match?.fixture?.status?.short == 'FT' ||
      match?.fixture?.status?.short == 'AET' ||
      match?.fixture?.status?.short == 'PEN' ||
      match?.fixture?.status?.short == 'BT ' ||
      match?.fixture?.status?.short == 'INT' ||
      match?.fixture?.status?.short == 'LIVE'
    ) {
      setNullValue('0');
    } else {
      let date = moment(match?.fixture?.date).format('h:mm a');
      setTime(date);
      setNullValue('-');
    }
  }, []);
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        navigation.navigate('Fixture', {
          id: match?.fixture?.id,
          team1: match?.teams?.home,
          team2: match?.teams?.away,
          status: match?.fixture?.status.short,
          matchDate: match?.fixture?.date,
        });
      }}>
      <View style={styles.teams}>
        <View style={styles.team}>
          <Text style={styles.text}>{match?.teams?.home?.name}</Text>
          <Text style={styles.text}>{match?.goals?.home || nullValue}</Text>
        </View>
        <View style={styles.team}>
          <Text style={styles.text}>{match?.teams?.away?.name}</Text>
          <Text style={styles.text}>{match?.goals?.away || nullValue}</Text>
        </View>
      </View>
      <View style={styles.time}>
        <Text style={styles.text}>{time || match?.fixture?.status?.short}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Match;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#3e3c42',
    borderTopWidth: 0.5,
    borderBottomWidth: 1,
    borderColor: 'white',
    flexDirection: 'row',
    width: '100%',
  },
  teams: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '70%',
    padding: 10,
  },
  team: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  time: {
    width: '30%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 14,
  },
});
