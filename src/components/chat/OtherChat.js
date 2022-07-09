/* eslint-disable prettier/prettier */
import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import moment from 'moment';

const OtherChat = ({chatData}) => {
  return (
    <View style={styles.otherChatContainer}>
      <View style={styles.otherChat}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}>
          <Text style={styles.nameText}>{chatData?.sentBy?.username}</Text>
          <Text style={styles.timeText}>
            {moment(chatData?.time).format('DD/MM/YY h:mm a')}
          </Text>
        </View>
        <View style={{alignItems: 'flex-start'}}>
          <Text style={styles.text}>{chatData?.message}</Text>
        </View>
      </View>
    </View>
  );
};

export default OtherChat;

const styles = StyleSheet.create({
  otherChatContainer: {
    alignItems: 'flex-start',
  },
  otherChat: {
    padding: 10,
    backgroundColor: 'purple',
    borderColor: 'purple',
    borderWidth: 1,
    borderRadius: 20,
    maxWidth: '85%',
    marginLeft: 5,
    marginVertical: 5,
  },
  text: {
    color: 'white',
    fontSize: 16,
  },
  timeText: {
    fontSize: 12,
    color: 'pink',
    marginLeft: 10,
  },
  nameText: {
    fontSize: 16,
    color: 'yellow',
    fontWeight: 'bold',
  },
});
