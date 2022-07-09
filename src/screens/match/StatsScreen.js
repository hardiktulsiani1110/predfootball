/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';
import {useRoute} from '@react-navigation/native';

import {getMatchStats} from '../../functions/matches';

const StatsScreen = () => {
  const route = useRoute();
  const {id, team1, team2, status} = route.params;
  const [team1Stats, setTeam1Stats] = useState({});
  const [team2Stats, setTeam2Stats] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const getStats = () => {
    setIsLoading(true);
    getMatchStats(id)
      .then(async res => {
        // console.log('response', res.data.response);
        await setTeam1Stats(res.data.response[0]);
        // console.log('team1Stats', team1Stats);
        await setTeam2Stats(res.data.response[1]);
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false);
      });
  };
  useEffect(() => {
    getStats();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.page}>
        <ActivityIndicator size="large" color="white" />
      </View>
    );
  }

  if (
    status !== '1H' &&
    status !== 'HT' &&
    status !== '2H' &&
    status !== 'ET' &&
    status !== 'P' &&
    status !== 'FT' &&
    status !== 'AET' &&
    status !== 'PEN' &&
    status !== 'BT ' &&
    status !== 'INT' &&
    status !== 'LIVE'
  ) {
    return (
      <View style={styles.page2}>
        <Text style={styles.heading}>Match Stats not available</Text>
      </View>
    );
  }
  return (
    <View style={styles.page}>
      <ScrollView contentContainerStyle={{alignItems: 'center'}}>
        <View style={styles.item}>
          <View style={styles.itemLeft}>
            <Text style={styles.text}>{team1Stats?.team?.name}</Text>
          </View>
          <View style={styles.itemRight}>
            <Text style={styles.text}>{team2Stats?.team?.name}</Text>
          </View>
        </View>
        <View style={styles.statRow}>
          <Text style={styles.text}>
            {team1Stats?.statistics[0]?.value || 0}
          </Text>
          <Text style={styles.text}>{team1Stats?.statistics[0]?.type}</Text>
          <Text style={styles.text}>
            {team2Stats?.statistics[0]?.value || 0}
          </Text>
        </View>
        <View style={styles.statRow}>
          <Text style={styles.text}>
            {team1Stats?.statistics[1]?.value || 0}
          </Text>
          <Text style={styles.text}>{team1Stats?.statistics[1]?.type}</Text>
          <Text style={styles.text}>
            {team2Stats?.statistics[1]?.value || 0}
          </Text>
        </View>
        <View style={styles.statRow}>
          <Text style={styles.text}>
            {team1Stats?.statistics[2]?.value || 0}
          </Text>
          <Text style={styles.text}>{team1Stats?.statistics[2]?.type}</Text>
          <Text style={styles.text}>
            {team2Stats?.statistics[2]?.value || 0}
          </Text>
        </View>
        <View style={styles.statRow}>
          <Text style={styles.text}>
            {team1Stats?.statistics[3]?.value || 0}
          </Text>
          <Text style={styles.text}>{team1Stats?.statistics[3]?.type}</Text>
          <Text style={styles.text}>
            {team2Stats?.statistics[3]?.value || 0}
          </Text>
        </View>
        <View style={styles.statRow}>
          <Text style={styles.text}>
            {team1Stats?.statistics[4]?.value || 0}
          </Text>
          <Text style={styles.text}>{team1Stats?.statistics[4]?.type}</Text>
          <Text style={styles.text}>
            {team2Stats?.statistics[4]?.value || 0}
          </Text>
        </View>
        <View style={styles.statRow}>
          <Text style={styles.text}>
            {team1Stats?.statistics[5]?.value || 0}
          </Text>
          <Text style={styles.text}>{team1Stats?.statistics[5]?.type}</Text>
          <Text style={styles.text}>
            {team2Stats?.statistics[5]?.value || 0}
          </Text>
        </View>
        <View style={styles.statRow}>
          <Text style={styles.text}>
            {team1Stats?.statistics[6]?.value || 0}
          </Text>
          <Text style={styles.text}>{team1Stats?.statistics[6]?.type}</Text>
          <Text style={styles.text}>
            {team2Stats?.statistics[6]?.value || 0}
          </Text>
        </View>
        <View style={styles.statRow}>
          <Text style={styles.text}>
            {team1Stats?.statistics[7]?.value || 0}
          </Text>
          <Text style={styles.text}>{team1Stats?.statistics[7]?.type}</Text>
          <Text style={styles.text}>
            {team2Stats?.statistics[7]?.value || 0}
          </Text>
        </View>
        <View style={styles.statRow}>
          <Text style={styles.text}>
            {team1Stats?.statistics[8]?.value || 0}
          </Text>
          <Text style={styles.text}>{team1Stats?.statistics[8]?.type}</Text>
          <Text style={styles.text}>
            {team2Stats?.statistics[8]?.value || 0}
          </Text>
        </View>
        <View style={styles.statRow}>
          <Text style={styles.text}>
            {team1Stats?.statistics[9]?.value || 0}
          </Text>
          <Text style={styles.text}>{team1Stats?.statistics[9]?.type}</Text>
          <Text style={styles.text}>
            {team2Stats?.statistics[9]?.value || 0}
          </Text>
        </View>
        <View style={styles.statRow}>
          <Text style={styles.text}>
            {team1Stats?.statistics[10]?.value || 0}
          </Text>
          <Text style={styles.text}>{team1Stats?.statistics[10]?.type}</Text>
          <Text style={styles.text}>
            {team2Stats?.statistics[10]?.value || 0}
          </Text>
        </View>
        <View style={styles.statRow}>
          <Text style={styles.text}>
            {team1Stats?.statistics[11]?.value || 0}
          </Text>
          <Text style={styles.text}>{team1Stats?.statistics[11]?.type}</Text>
          <Text style={styles.text}>
            {team2Stats?.statistics[11]?.value || 0}
          </Text>
        </View>
        <View style={styles.statRow}>
          <Text style={styles.text}>
            {team1Stats?.statistics[12]?.value || 0}
          </Text>
          <Text style={styles.text}>{team1Stats?.statistics[12]?.type}</Text>
          <Text style={styles.text}>
            {team2Stats?.statistics[12]?.value || 0}
          </Text>
        </View>
        <View style={styles.statRow}>
          <Text style={styles.text}>
            {team1Stats?.statistics[13]?.value || 0}
          </Text>
          <Text style={styles.text}>{team1Stats?.statistics[13]?.type}</Text>
          <Text style={styles.text}>
            {team2Stats?.statistics[13]?.value || 0}
          </Text>
        </View>
        <View style={styles.statRow}>
          <Text style={styles.text}>
            {team1Stats?.statistics[14]?.value || 0}
          </Text>
          <Text style={styles.text}>{team1Stats?.statistics[14]?.type}</Text>
          <Text style={styles.text}>
            {team2Stats?.statistics[14]?.value || 0}
          </Text>
        </View>
        <View style={styles.statRow}>
          <Text style={styles.text}>
            {team1Stats?.statistics[15]?.value || 0}
          </Text>
          <Text style={styles.text}>{team1Stats?.statistics[15]?.type}</Text>
          <Text style={styles.text}>
            {team2Stats?.statistics[15]?.value || 0}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default StatsScreen;

const styles = StyleSheet.create({
  page: {
    backgroundColor: 'black',
    // alignItems: 'center',
    flex: 1,
  },
  page2: {
    backgroundColor: 'black',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    borderBottomWidth: 1,
    borderColor: 'white',
    height: 40,
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemLeft: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '50%',
    paddingLeft: 25,
  },
  itemRight: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    width: '50%',
    paddingRight: 25,
  },
  text: {
    color: 'white',
  },
  statRow: {
    borderBottomWidth: 1,
    borderColor: 'white',
    height: 40,
    width: '90%',
    paddingHorizontal: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  heading: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});
