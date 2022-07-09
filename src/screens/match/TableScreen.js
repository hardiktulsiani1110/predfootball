/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {getLeagueRankings} from '../../functions/matches';

const TableScreen = ({route, navigation}) => {
  const {leagueId, season, leagueName} = route.params;
  const [rankings, setRankings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getStandings = () => {
    setIsLoading(true);
    getLeagueRankings(leagueId, season)
      .then(res => {
        setRankings(res.data.response[0].league.standings[0]);
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false);
      });
  };
  useEffect(() => {
    navigation.setOptions({
      title: leagueName,
    });
    getStandings();
  }, []);
  if (isLoading) {
    return (
      <View style={styles.page}>
        <ActivityIndicator size="large" color="white" />
      </View>
    );
  }
  return (
    <ScrollView style={styles.page}>
      <View style={styles.container}>
        <View style={styles.container3}>
          <View style={styles.clubItem}>
            <Text style={styles.clubHeading}>R</Text>
          </View>
          {rankings.length != 0 && (
            <FlatList
              data={rankings}
              keyExtractor={item => item?.team?.id}
              renderItem={itemData => {
                return (
                  <View style={styles.clubItem}>
                    <Text style={styles.clubHeading}>
                      {itemData?.item?.rank}
                    </Text>
                  </View>
                );
              }}
            />
          )}
        </View>
        <View style={styles.container1}>
          <View style={styles.clubItem}>
            <Text style={styles.clubHeading}>Club</Text>
          </View>
          {rankings.length != 0 && (
            <FlatList
              data={rankings}
              keyExtractor={item => item?.team?.id}
              renderItem={itemData => {
                return (
                  <View style={styles.clubItem}>
                    <Text style={styles.clubHeading}>
                      {itemData?.item?.team?.name}
                    </Text>
                  </View>
                );
              }}
            />
          )}
        </View>
        <ScrollView horizontal={true} vertical={false}>
          <View style={styles.container2}>
            <View style={styles.statsItem}>
              <Text style={styles.statHeading}>GP</Text>
              <Text style={styles.statHeading}>W</Text>
              <Text style={styles.statHeading}>D</Text>
              <Text style={styles.statHeading}>L</Text>
              <Text style={styles.statHeading}>GF</Text>
              <Text style={styles.statHeading}>GA</Text>
              <Text style={styles.statHeading}>GD</Text>
              <Text style={styles.statHeading}>PTS</Text>
              <Text style={styles.statHeading}>LAST 5</Text>
            </View>
            {rankings.length != 0 && (
              <FlatList
                data={rankings}
                keyExtractor={item => item?.team?.id}
                renderItem={itemData => {
                  return (
                    <View style={styles.statsItem}>
                      <Text style={styles.statHeading}>
                        {itemData?.item?.all?.played}
                      </Text>
                      <Text style={styles.statHeading}>
                        {itemData?.item?.all?.win}
                      </Text>
                      <Text style={styles.statHeading}>
                        {itemData?.item?.all?.draw}
                      </Text>
                      <Text style={styles.statHeading}>
                        {itemData?.item?.all?.lose}
                      </Text>
                      <Text style={styles.statHeading}>
                        {itemData?.item?.all?.goals?.for}
                      </Text>
                      <Text style={styles.statHeading}>
                        {itemData?.item?.all?.goals?.against}
                      </Text>
                      <Text style={styles.statHeading}>
                        {itemData?.item?.goalsDiff}
                      </Text>
                      <Text style={styles.statHeading}>
                        {itemData?.item?.points}
                      </Text>
                      <Text style={styles.statHeading}>
                        {itemData?.item?.form}
                      </Text>
                    </View>
                  );
                }}
              />
            )}
          </View>
        </ScrollView>
      </View>
    </ScrollView>
  );
};

export default TableScreen;

const styles = StyleSheet.create({
  page: {
    // backgroundColor: '#3e3c42',
    backgroundColor: 'black',
    flex: 1,
    width: '100%',
  },
  container: {
    width: '100%',
    flexDirection: 'row',
  },
  container3: {
    width: '6%',
  },
  container1: {
    width: '40%',
  },
  container2: {
    width: '100%',
  },
  clubItem: {
    width: '100%',
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderColor: 'white',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clubHeading: {
    color: 'white',
  },
  statsItem: {
    width: '100%',
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderColor: 'white',
    height: 30,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  statHeading: {
    color: 'white',
    paddingHorizontal: 10,
  },
});
