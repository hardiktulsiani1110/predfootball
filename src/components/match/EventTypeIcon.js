/* eslint-disable prettier/prettier */
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Icon} from 'react-native-elements';

const EventTypeIcon = ({type, detail}) => {
  if (type === 'Goal') {
    return (
      <View style={{marginLeft: 15, marginRight: 15, alignItems: 'center'}}>
        <Icon name="football-sharp" type="ionicon" size={26} color="white" />
      </View>
    );
  }
  if (type === 'Card' && detail === 'Yellow Card') {
    return (
      <View style={{marginLeft: 15, marginRight: 15, alignItems: 'center'}}>
        <Icon name="rectangle" type="fontisto" size={26} color="yellow" />
      </View>
    );
  }
  if (type === 'Card' && detail === 'Red Card') {
    return (
      <View style={{marginLeft: 15, marginRight: 15, alignItems: 'center'}}>
        <Icon name="rectangle" type="fontisto" size={26} color="red" />
      </View>
    );
  }
  if (type === 'subst') {
    return (
      <View style={{marginLeft: 15, marginRight: 15, alignItems: 'center'}}>
        <Icon
          name="rotate-3d-variant"
          type="material-community"
          size={26}
          color="white"
        />
      </View>
    );
  }
  return <View></View>;
};

export default EventTypeIcon;

const styles = StyleSheet.create({});
