/* eslint-disable prettier/prettier */
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import EventTypeIcon from './EventTypeIcon';
const Event = ({team, time, player, assist, type, detail, team1, team2}) => {
  if (type !== 'Goal' && type !== 'Card' && type !== 'subst') {
    return <View></View>;
  }
  if (team.id === team1.id) {
    return (
      <View style={styles.team1}>
        <View style={{alignItems: 'center'}}>
          <Text style={styles.minute}>
            {time?.elapsed}
            {''}
            {time?.extra ? (
              <Text style={styles.minute}>+{time?.extra}'</Text>
            ) : (
              <Text></Text>
            )}
          </Text>
        </View>
        <EventTypeIcon type={type} detail={detail} />
        {type === 'Goal' && (
          <View>
            <Text style={styles.scorer}>{player?.name}</Text>
            {assist?.name && (
              <Text style={styles.assister}>Assist: {assist?.name}</Text>
            )}
          </View>
        )}
        {type === 'subst' && (
          <View>
            <Text style={styles.scorer}>{assist?.name}</Text>
            <Text style={styles.assister}>{player?.name}</Text>
          </View>
        )}
        {type === 'Card' && (
          <View>
            <Text style={styles.scorer}>{player?.name}</Text>
          </View>
        )}
      </View>
    );
  }
  return (
    <View style={styles.team2}>
      {type === 'Goal' && (
        <View>
          <Text style={styles.scorer}>{player?.name}</Text>
          {assist?.name && (
            <Text style={styles.assister}>Assist: {assist?.name}</Text>
          )}
        </View>
      )}
      {type === 'subst' && (
        <View>
          <Text style={styles.scorer}>{assist?.name}</Text>
          <Text style={styles.assister}>{player?.name}</Text>
        </View>
      )}
      {type === 'Card' && (
        <View>
          <Text style={styles.scorer}>{player?.name}</Text>
        </View>
      )}
      <View style={{marginLeft: 15, marginRight: 15, alignItems: 'center'}}>
        <EventTypeIcon type={type} detail={detail} />
      </View>
      <View style={{alignItems: 'center'}}>
        <Text style={styles.minute}>
          {time?.elapsed}
          {''}
          {time?.extra ? (
            <Text style={styles.minute}>+{time?.extra}'</Text>
          ) : (
            <Text></Text>
          )}
        </Text>
      </View>
    </View>
  );
};

export default Event;

const styles = StyleSheet.create({
  team1: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3e3c42',
    borderColor: 'white',
    borderBottomWidth: 1,
    width: '100%',
    padding: 10,
  },
  minute: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  scorer: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  assister: {
    color: 'white',
    fontSize: 14,
  },
  team2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: '#3e3c42',
    borderColor: 'white',
    borderBottomWidth: 1,
    width: '100%',
    padding: 10,
  },
});
