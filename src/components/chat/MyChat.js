/* eslint-disable prettier/prettier */
import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import moment from 'moment';
const MyChat = ({chatData}) => {
  return (
    <View style={styles.myChatContainer}>
      <View style={styles.myChat}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}>
          <Text style={styles.nameText}>you</Text>
          <Text style={styles.timeText}>
            {moment(chatData?.time).format('DD/MM/YY h:mm a')}
          </Text>
        </View>
        <View style={{alignItems: 'flex-end'}}>
          <Text style={styles.text}>{chatData?.message}</Text>
        </View>
      </View>
    </View>
  );
};

export default MyChat;

const styles = StyleSheet.create({
  myChatContainer: {
    alignItems: 'flex-end',
  },
  myChat: {
    padding: 10,
    backgroundColor: '#3e3c42',
    borderRadius: 20,
    maxWidth: '85%',
    marginRight: 5,
    marginVertical: 5,
  },
  text: {
    color: 'white',
    fontSize: 16,
  },
  timeText: {
    fontSize: 12,
    color: 'orange',
    marginLeft: 10,
  },
  nameText: {
    fontSize: 16,
    color: 'red',
    fontWeight: 'bold',
  },
});
