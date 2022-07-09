/* eslint-disable prettier/prettier */
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, useEffect, useLayoutEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  LogBox,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {useDispatch} from 'react-redux';
import League from '../../components/match/League';

import moment from 'moment';
import {getLeagueMatches} from '../../functions/matches';

const AllMatchesScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [matchesLaLiga, setMatchesLaLiga] = useState({
    minus2: [],
    minus1: [],
    today: [],
    add1: [],
    add2: [],
  });
  const [matchesPL, setMatchesPL] = useState({
    minus2: [],
    minus1: [],
    today: [],
    add1: [],
    add2: [],
  });
  const [matchesUCL, setMatchesUCL] = useState({
    minus2: [],
    minus1: [],
    today: [],
    add1: [],
    add2: [],
  });
  const [isLoading, setIsLoading] = useState(false);

  const logoutHandler = async () => {
    dispatch({type: 'LOGOUT'});
    await AsyncStorage.removeItem('userData');
    navigation.replace('Auth');
  };

  const gettingPLMatches = async () => {
    setIsLoading(true);
    let startDate = moment().subtract(2, 'days').format('YYYY-MM-DD');
    let endDate = moment().add(2, 'days').format('YYYY-MM-DD');
    getLeagueMatches(39, startDate, endDate)
      .then(res => {
        let matchesMinus2 = [];
        let matchesMinus1 = [];
        let matches0 = [];
        let matchesAdd2 = [];
        let matchesAdd1 = [];
        for (var i = 0; i < res.data.response.length; i++) {
          if (
            moment(res.data.response[i].fixture.date).format('YYYY-MM-DD') ==
            moment().subtract(2, 'days').format('YYYY-MM-DD')
          ) {
            matchesMinus2.push(res.data.response[i]);
          } else if (
            moment(res.data.response[i].fixture.date).format('YYYY-MM-DD') ==
            moment().subtract(1, 'days').format('YYYY-MM-DD')
          ) {
            matchesMinus1.push(res.data.response[i]);
          } else if (
            moment(res.data.response[i].fixture.date).format('YYYY-MM-DD') ==
            moment().subtract(0, 'days').format('YYYY-MM-DD')
          ) {
            matches0.push(res.data.response[i]);
          } else if (
            moment(res.data.response[i].fixture.date).format('YYYY-MM-DD') ==
            moment().add(1, 'days').format('YYYY-MM-DD')
          ) {
            matchesAdd1.push(res.data.response[i]);
          } else if (
            moment(res.data.response[i].fixture.date).format('YYYY-MM-DD') ==
            moment().add(2, 'days').format('YYYY-MM-DD')
          ) {
            matchesAdd2.push(res.data.response[i]);
          }
        }
        setMatchesPL({
          minus2: matchesMinus2,
          minus1: matchesMinus1,
          today: matches0,
          add1: matchesAdd1,
          add2: matchesAdd2,
        });
        // setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false);
      });
  };

  const gettingLaLigaMatches = async () => {
    // setIsLoading(true);
    let startDate = moment().subtract(2, 'days').format('YYYY-MM-DD');
    let endDate = moment().add(2, 'days').format('YYYY-MM-DD');
    getLeagueMatches(140, startDate, endDate)
      .then(res => {
        let matchesMinus2 = [];
        let matchesMinus1 = [];
        let matches0 = [];
        let matchesAdd2 = [];
        let matchesAdd1 = [];
        for (var i = 0; i < res.data.response.length; i++) {
          if (
            moment(res.data.response[i].fixture.date).format('YYYY-MM-DD') ==
            moment().subtract(2, 'days').format('YYYY-MM-DD')
          ) {
            matchesMinus2.push(res.data.response[i]);
          } else if (
            moment(res.data.response[i].fixture.date).format('YYYY-MM-DD') ==
            moment().subtract(1, 'days').format('YYYY-MM-DD')
          ) {
            matchesMinus1.push(res.data.response[i]);
          } else if (
            moment(res.data.response[i].fixture.date).format('YYYY-MM-DD') ==
            moment().subtract(0, 'days').format('YYYY-MM-DD')
          ) {
            matches0.push(res.data.response[i]);
          } else if (
            moment(res.data.response[i].fixture.date).format('YYYY-MM-DD') ==
            moment().add(1, 'days').format('YYYY-MM-DD')
          ) {
            matchesAdd1.push(res.data.response[i]);
          } else if (
            moment(res.data.response[i].fixture.date).format('YYYY-MM-DD') ==
            moment().add(2, 'days').format('YYYY-MM-DD')
          ) {
            matchesAdd2.push(res.data.response[i]);
          }
        }
        setMatchesLaLiga({
          minus2: matchesMinus2,
          minus1: matchesMinus1,
          today: matches0,
          add1: matchesAdd1,
          add2: matchesAdd2,
        });
        // setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false);
      });
  };
  const gettingUCLMatches = async () => {
    // setIsLoading(true);
    let startDate = moment().subtract(2, 'days').format('YYYY-MM-DD');
    let endDate = moment().add(2, 'days').format('YYYY-MM-DD');
    getLeagueMatches(2, startDate, endDate)
      .then(res => {
        let matchesMinus2 = [];
        let matchesMinus1 = [];
        let matches0 = [];
        let matchesAdd2 = [];
        let matchesAdd1 = [];
        for (var i = 0; i < res.data.response.length; i++) {
          if (
            moment(res.data.response[i].fixture.date).format('YYYY-MM-DD') ==
            moment().subtract(2, 'days').format('YYYY-MM-DD')
          ) {
            matchesMinus2.push(res.data.response[i]);
          } else if (
            moment(res.data.response[i].fixture.date).format('YYYY-MM-DD') ==
            moment().subtract(1, 'days').format('YYYY-MM-DD')
          ) {
            matchesMinus1.push(res.data.response[i]);
          } else if (
            moment(res.data.response[i].fixture.date).format('YYYY-MM-DD') ==
            moment().subtract(0, 'days').format('YYYY-MM-DD')
          ) {
            matches0.push(res.data.response[i]);
          } else if (
            moment(res.data.response[i].fixture.date).format('YYYY-MM-DD') ==
            moment().add(1, 'days').format('YYYY-MM-DD')
          ) {
            matchesAdd1.push(res.data.response[i]);
          } else if (
            moment(res.data.response[i].fixture.date).format('YYYY-MM-DD') ==
            moment().add(2, 'days').format('YYYY-MM-DD')
          ) {
            matchesAdd2.push(res.data.response[i]);
          }
        }
        setMatchesUCL({
          minus2: matchesMinus2,
          minus1: matchesMinus1,
          today: matches0,
          add1: matchesAdd1,
          add2: matchesAdd2,
        });
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false);
      });
  };
  useEffect(() => {
    LogBox.ignoreLogs([
      'VirtualizedLists should never be nested inside plain ScrollViews with the same orientation because it can break windowing and other functionality - use another VirtualizedList-backed container instead.',
    ]);
  }, []);
  useEffect(() => {
    gettingPLMatches();
    gettingLaLigaMatches();
    gettingUCLMatches();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.page}>
        <ActivityIndicator size="large" color="white" />
      </View>
    );
  }
  return (
    <View style={styles.page}>
      <TouchableOpacity
        style={{position: 'absolute', top: 10, left: 10}}
        onPress={logoutHandler}>
        <Icon name="logout" type="simple-line-icon" size={22} color="white" />
      </TouchableOpacity>
      <View style={{alignItems: 'center', marginBottom: 10}}>
        <Text style={styles.predFootball}>PredFootball</Text>
      </View>
      <ScrollView>
        {(matchesPL?.minus2?.length != 0 ||
          matchesLaLiga?.minus2?.length != 0 ||
          matchesUCL?.minus2?.length != 0) && (
          <View>
            <View style={{alignItems: 'center'}}>
              <Text style={styles.text}>
                {moment().subtract(2, 'days').format('DD-MM-YY')}
              </Text>
            </View>
            <League matches={matchesPL.minus2} />
            {matchesPL?.minus2?.length != 0 && (
              <View style={{height: 10}}></View>
            )}
            <League matches={matchesLaLiga.minus2} />
            {matchesLaLiga?.minus2?.length != 0 && (
              <View style={{height: 10}}></View>
            )}
            <League matches={matchesUCL.minus2} />
          </View>
        )}
        {(matchesPL?.minus1?.length != 0 ||
          matchesLaLiga?.minus1?.length != 0 ||
          matchesUCL?.minus1?.length != 0) && (
          <View>
            <View style={{alignItems: 'center'}}>
              <Text style={styles.text}>Yesterday</Text>
            </View>
            <League matches={matchesPL.minus1} />
            {matchesPL?.minus1?.length != 0 && (
              <View style={{height: 10}}></View>
            )}
            <League matches={matchesLaLiga.minus1} />
            {matchesLaLiga?.minus1?.length != 0 && (
              <View style={{height: 10}}></View>
            )}
            <League matches={matchesUCL.minus1} />
          </View>
        )}
        {(matchesPL?.today?.length != 0 ||
          matchesLaLiga?.today?.length != 0 ||
          matchesUCL?.today?.length != 0) && (
          <View>
            <View style={{alignItems: 'center'}}>
              <Text style={styles.text}>Today</Text>
            </View>
            <League matches={matchesPL.today} />
            {matchesPL?.today?.length != 0 && (
              <View style={{height: 10}}></View>
            )}
            <League matches={matchesLaLiga.today} />
            {matchesLaLiga?.today?.length != 0 && (
              <View style={{height: 10}}></View>
            )}
            <League matches={matchesUCL.today} />
          </View>
        )}
        {(matchesPL?.add1?.length != 0 ||
          matchesLaLiga?.add1?.length != 0 ||
          matchesUCL?.add1?.length != 0) && (
          <View>
            <View style={{alignItems: 'center'}}>
              <Text style={styles.text}>Tomorrow</Text>
            </View>
            <League matches={matchesPL.add1} />
            {matchesPL?.add1?.length != 0 && <View style={{height: 10}}></View>}
            <League matches={matchesLaLiga.add1} />
            {matchesLaLiga?.add1?.length != 0 && (
              <View style={{height: 10}}></View>
            )}
            <League matches={matchesUCL.add1} />
          </View>
        )}
        {(matchesPL?.add2?.length != 0 ||
          matchesLaLiga?.add2?.length != 0 ||
          matchesUCL?.add2?.length != 0) && (
          <View>
            <View style={{alignItems: 'center'}}>
              <Text style={styles.text}>
                {moment().add(2, 'days').format('DD-MM-YY')}
              </Text>
            </View>
            <League matches={matchesPL.add2} />
            {matchesPL?.add2?.length != 0 && <View style={{height: 10}}></View>}
            <League matches={matchesLaLiga.add2} />
            {matchesLaLiga?.add2?.length != 0 && (
              <View style={{height: 10}}></View>
            )}
            <League matches={matchesUCL.add2} />
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default AllMatchesScreen;

const styles = StyleSheet.create({
  page: {
    backgroundColor: 'black',
    flex: 1,
  },
  text: {
    color: 'white',
    fontSize: 18,
  },
  predFootball: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 30,
  },
});
