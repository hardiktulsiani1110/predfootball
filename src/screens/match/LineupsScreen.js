/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';
import {getMatchLineups} from '../../functions/matches';
import {useRoute} from '@react-navigation/native';
import {useDispatch} from 'react-redux';

const LineupsScreen = () => {
  const route = useRoute();
  const {id, team1, team2, status} = route.params;
  const [team1Lineup, setTeam1Lineup] = useState({});
  const [team2Lineup, setTeam2Lineup] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const getLineups = () => {
    setIsLoading(true);
    getMatchLineups(id)
      .then(async res => {
        // console.log('response', res.data.response);
        await setTeam1Lineup(res.data.response[0]);
        // console.log('team1Lineup', team1Lineup);
        await setTeam2Lineup(res.data.response[1]);
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false);
      });
  };
  useEffect(() => {
    getLineups();
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
        <Text style={styles.heading}>Match Lineups not available</Text>
      </View>
    );
  }
  return (
    <View style={styles.page}>
      <ScrollView contentContainerStyle={{alignItems: 'center'}}>
        <View style={styles.item}>
          <View style={styles.itemLeft}>
            <Text style={styles.text}>{team1.name}</Text>
          </View>
          <View style={styles.itemRight}>
            <Text style={styles.text}>{team2.name}</Text>
          </View>
        </View>
        <View style={styles.item}>
          <Text style={styles.text}>Formation</Text>
        </View>
        <View style={styles.item}>
          <View style={styles.itemLeft}>
            <Text style={styles.text}>{team1Lineup?.formation}</Text>
          </View>
          <View style={styles.itemRight}>
            <Text style={styles.text}>{team2Lineup?.formation}</Text>
          </View>
        </View>
        <View style={styles.item}>
          <Text style={styles.text}>Coach</Text>
        </View>
        <View style={styles.item}>
          <View style={styles.itemLeft}>
            <Text style={styles.text}>{team1Lineup?.coach?.name}</Text>
          </View>
          <View style={styles.itemRight}>
            <Text style={styles.text}>{team2Lineup?.coach?.name}</Text>
          </View>
        </View>
        <View style={styles.item}>
          <Text style={styles.text}>Players</Text>
        </View>
        <View style={styles.item}>
          <View style={styles.itemLeft}>
            <Text style={styles.text}>
              {team1Lineup?.startXI[0]?.player?.name}
            </Text>
          </View>
          <View style={styles.itemRight}>
            <Text style={styles.text}>
              {team2Lineup?.startXI[0]?.player?.name}
            </Text>
          </View>
        </View>
        <View style={styles.item}>
          <View style={styles.itemLeft}>
            <Text style={styles.text}>
              {team1Lineup?.startXI[1]?.player?.name}
            </Text>
          </View>
          <View style={styles.itemRight}>
            <Text style={styles.text}>
              {team2Lineup?.startXI[1]?.player?.name}
            </Text>
          </View>
        </View>
        <View style={styles.item}>
          <View style={styles.itemLeft}>
            <Text style={styles.text}>
              {team1Lineup?.startXI[2]?.player?.name}
            </Text>
          </View>
          <View style={styles.itemRight}>
            <Text style={styles.text}>
              {team2Lineup?.startXI[2]?.player?.name}
            </Text>
          </View>
        </View>
        <View style={styles.item}>
          <View style={styles.itemLeft}>
            <Text style={styles.text}>
              {team1Lineup?.startXI[3]?.player?.name}
            </Text>
          </View>
          <View style={styles.itemRight}>
            <Text style={styles.text}>
              {team2Lineup?.startXI[3]?.player?.name}
            </Text>
          </View>
        </View>
        <View style={styles.item}>
          <View style={styles.itemLeft}>
            <Text style={styles.text}>
              {team1Lineup?.startXI[4]?.player?.name}
            </Text>
          </View>
          <View style={styles.itemRight}>
            <Text style={styles.text}>
              {team2Lineup?.startXI[4]?.player?.name}
            </Text>
          </View>
        </View>
        <View style={styles.item}>
          <View style={styles.itemLeft}>
            <Text style={styles.text}>
              {team1Lineup?.startXI[5]?.player?.name}
            </Text>
          </View>
          <View style={styles.itemRight}>
            <Text style={styles.text}>
              {team2Lineup?.startXI[5]?.player?.name}
            </Text>
          </View>
        </View>
        <View style={styles.item}>
          <View style={styles.itemLeft}>
            <Text style={styles.text}>
              {team1Lineup?.startXI[6]?.player?.name}
            </Text>
          </View>
          <View style={styles.itemRight}>
            <Text style={styles.text}>
              {team2Lineup?.startXI[6]?.player?.name}
            </Text>
          </View>
        </View>
        <View style={styles.item}>
          <View style={styles.itemLeft}>
            <Text style={styles.text}>
              {team1Lineup?.startXI[7]?.player?.name}
            </Text>
          </View>
          <View style={styles.itemRight}>
            <Text style={styles.text}>
              {team2Lineup?.startXI[7]?.player?.name}
            </Text>
          </View>
        </View>
        <View style={styles.item}>
          <View style={styles.itemLeft}>
            <Text style={styles.text}>
              {team1Lineup?.startXI[8]?.player?.name}
            </Text>
          </View>
          <View style={styles.itemRight}>
            <Text style={styles.text}>
              {team2Lineup?.startXI[8]?.player?.name}
            </Text>
          </View>
        </View>
        <View style={styles.item}>
          <View style={styles.itemLeft}>
            <Text style={styles.text}>
              {team1Lineup?.startXI[9]?.player?.name}
            </Text>
          </View>
          <View style={styles.itemRight}>
            <Text style={styles.text}>
              {team2Lineup?.startXI[9]?.player?.name}
            </Text>
          </View>
        </View>
        <View style={styles.item}>
          <View style={styles.itemLeft}>
            <Text style={styles.text}>
              {team1Lineup?.startXI[10]?.player?.name}
            </Text>
          </View>
          <View style={styles.itemRight}>
            <Text style={styles.text}>
              {team2Lineup?.startXI[10]?.player?.name}
            </Text>
          </View>
        </View>
        <View style={styles.item}>
          <Text style={styles.text}>Substitutes</Text>
        </View>
        {(team1Lineup?.substitutes?.length >= 1 ||
          team2Lineup?.substitutes?.length >= 1) && (
          <View style={styles.item}>
            <View style={styles.itemLeft}>
              <Text style={styles.text}>
                {team1Lineup?.substitutes[0]?.player?.name}
              </Text>
            </View>
            <View style={styles.itemRight}>
              <Text style={styles.text}>
                {team2Lineup?.substitutes[0]?.player?.name}
              </Text>
            </View>
          </View>
        )}
        {(team1Lineup?.substitutes?.length >= 2 ||
          team2Lineup?.substitutes?.length >= 2) && (
          <View style={styles.item}>
            <View style={styles.itemLeft}>
              <Text style={styles.text}>
                {team1Lineup?.substitutes[1]?.player?.name}
              </Text>
            </View>
            <View style={styles.itemRight}>
              <Text style={styles.text}>
                {team2Lineup?.substitutes[1]?.player?.name}
              </Text>
            </View>
          </View>
        )}
        {(team1Lineup?.substitutes?.length >= 3 ||
          team2Lineup?.substitutes?.length >= 3) && (
          <View style={styles.item}>
            <View style={styles.itemLeft}>
              <Text style={styles.text}>
                {team1Lineup?.substitutes[2]?.player?.name}
              </Text>
            </View>
            <View style={styles.itemRight}>
              <Text style={styles.text}>
                {team2Lineup?.substitutes[2]?.player?.name}
              </Text>
            </View>
          </View>
        )}
        {(team1Lineup?.substitutes?.length >= 4 ||
          team2Lineup?.substitutes?.length >= 4) && (
          <View style={styles.item}>
            <View style={styles.itemLeft}>
              <Text style={styles.text}>
                {team1Lineup?.substitutes[3]?.player?.name}
              </Text>
            </View>
            <View style={styles.itemRight}>
              <Text style={styles.text}>
                {team2Lineup?.substitutes[3]?.player?.name}
              </Text>
            </View>
          </View>
        )}
        {(team1Lineup?.substitutes?.length >= 5 ||
          team2Lineup?.substitutes?.length >= 5) && (
          <View style={styles.item}>
            <View style={styles.itemLeft}>
              <Text style={styles.text}>
                {team1Lineup?.substitutes[4]?.player?.name}
              </Text>
            </View>
            <View style={styles.itemRight}>
              <Text style={styles.text}>
                {team2Lineup?.substitutes[4]?.player?.name}
              </Text>
            </View>
          </View>
        )}
        {(team1Lineup?.substitutes?.length >= 6 ||
          team2Lineup?.substitutes?.length >= 6) && (
          <View style={styles.item}>
            <View style={styles.itemLeft}>
              <Text style={styles.text}>
                {team1Lineup?.substitutes[5]?.player?.name}
              </Text>
            </View>
            <View style={styles.itemRight}>
              <Text style={styles.text}>
                {team2Lineup?.substitutes[5]?.player?.name}
              </Text>
            </View>
          </View>
        )}
        {(team1Lineup?.substitutes?.length >= 7 ||
          team2Lineup?.substitutes?.length >= 7) && (
          <View style={styles.item}>
            <View style={styles.itemLeft}>
              <Text style={styles.text}>
                {team1Lineup?.substitutes[6]?.player?.name}
              </Text>
            </View>
            <View style={styles.itemRight}>
              <Text style={styles.text}>
                {team2Lineup?.substitutes[6]?.player?.name}
              </Text>
            </View>
          </View>
        )}
        {(team1Lineup?.substitutes?.length >= 8 ||
          team2Lineup?.substitutes?.length >= 8) && (
          <View style={styles.item}>
            <View style={styles.itemLeft}>
              <Text style={styles.text}>
                {team1Lineup?.substitutes[7]?.player?.name}
              </Text>
            </View>
            <View style={styles.itemRight}>
              <Text style={styles.text}>
                {team2Lineup?.substitutes[7]?.player?.name}
              </Text>
            </View>
          </View>
        )}
        {(team1Lineup?.substitutes?.length >= 9 ||
          team2Lineup?.substitutes?.length >= 9) && (
          <View style={styles.item}>
            <View style={styles.itemLeft}>
              <Text style={styles.text}>
                {team1Lineup?.substitutes[8]?.player?.name}
              </Text>
            </View>
            <View style={styles.itemRight}>
              <Text style={styles.text}>
                {team2Lineup?.substitutes[8]?.player?.name}
              </Text>
            </View>
          </View>
        )}
        {(team1Lineup?.substitutes?.length >= 10 ||
          team2Lineup?.substitutes?.length >= 10) && (
          <View style={styles.item}>
            <View style={styles.itemLeft}>
              <Text style={styles.text}>
                {team1Lineup?.substitutes[9]?.player?.name}
              </Text>
            </View>
            <View style={styles.itemRight}>
              <Text style={styles.text}>
                {team2Lineup?.substitutes[9]?.player?.name}
              </Text>
            </View>
          </View>
        )}
        {(team1Lineup?.substitutes?.length >= 11 ||
          team2Lineup?.substitutes?.length >= 11) && (
          <View style={styles.item}>
            <View style={styles.itemLeft}>
              <Text style={styles.text}>
                {team1Lineup?.substitutes[10]?.player?.name}
              </Text>
            </View>
            <View style={styles.itemRight}>
              <Text style={styles.text}>
                {team2Lineup?.substitutes[10]?.player?.name}
              </Text>
            </View>
          </View>
        )}
        {(team1Lineup?.substitutes?.length >= 12 ||
          team2Lineup?.substitutes?.length >= 12) && (
          <View style={styles.item}>
            <View style={styles.itemLeft}>
              <Text style={styles.text}>
                {team1Lineup?.substitutes[11]?.player?.name}
              </Text>
            </View>
            <View style={styles.itemRight}>
              <Text style={styles.text}>
                {team2Lineup?.substitutes[11]?.player?.name}
              </Text>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default LineupsScreen;

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
  heading: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});
