/* eslint-disable prettier/prettier */
import React from 'react';
import {StyleSheet, FlatList, View} from 'react-native';
import Event from './Event';
const Events = ({events, team1, team2}) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={events}
        renderItem={itemData => {
          return (
            <Event
              team={itemData?.item?.team}
              time={itemData?.item?.time}
              player={itemData?.item?.player}
              assist={itemData?.item?.assist}
              type={itemData?.item?.type}
              detail={itemData?.item?.detail}
              team1={team1}
              team2={team2}
            />
          );
        }}
      />
    </View>
  );
};

export default Events;

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});
