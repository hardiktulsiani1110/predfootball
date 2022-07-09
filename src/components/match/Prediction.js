/* eslint-disable prettier/prettier */
import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import moment from 'moment';

const Prediction = ({prediction, showUserName}) => {
  const auth = useSelector(state => state.auth);
  return (
    <View style={styles.prediction}>
      {showUserName && (
        <View style={{alignItems: 'center'}}>
          <Text style={styles.name}>
            {auth?.userId == prediction?.user?._id
              ? 'you'
              : prediction?.user?.username}
          </Text>
        </View>
      )}
      <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
        <View style={{alignItems: 'center'}}>
          <Text style={styles.team}>{prediction?.team1?.name}</Text>
          <Text style={styles.team}>{prediction?.team1?.predictedGoals}</Text>
        </View>
        <View style={{alignItems: 'center'}}>
          <Text style={styles.team}>{prediction?.team2?.name}</Text>
          <Text style={styles.team}>{prediction?.team2?.predictedGoals}</Text>
        </View>
      </View>
      <View style={{alignItems: 'center'}}>
        <Text style={styles.matchDate}>
          Match Date: {moment(prediction?.matchDate).format('DD/MM/YY h:mm a')}
        </Text>
      </View>
    </View>
  );
};

export default Prediction;

const styles = StyleSheet.create({
  prediction: {
    marginBottom: 20,
    backgroundColor: '#3e3c42',
  },
  name: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  team: {
    fontSize: 16,
    color: 'white',
    fontWeight: '400',
  },
  matchDate: {
    color: 'white',
    fontSize: 14,
    paddingBottom: 5,
  },
});
