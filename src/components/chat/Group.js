/* eslint-disable prettier/prettier */
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {getLatestChatMessage} from '../../functions/chats';
import {useSelector} from 'react-redux';

const Group = ({groupId, groupName, admin}) => {
  const auth = useSelector(state => state.auth);
  const navigation = useNavigation();
  const [user, setUser] = useState('');
  const [message, setMessage] = useState('');

  const getLatestMessage = () => {
    getLatestChatMessage(groupId)
      .then(response => {
        if (response.data[0]?.sentBy?._id == auth.userId) {
          setUser('you');
        } else {
          setUser(response.data[0]?.sentBy?.username);
        }
        setMessage(response.data[0]?.message);
      })
      .catch(err => {
        console.log(err);
      });
  };
  useEffect(() => {
    getLatestMessage();
  }, []);
  return (
    <TouchableOpacity
      style={styles.group}
      onPress={() =>
        navigation.push('Chat', {
          groupId,
          groupName,
          admin,
        })
      }>
      <Text style={styles.groupTitle}>{groupName}</Text>
      {!!user && (
        <View style={{flexDirection: 'row', marginLeft: 0, marginRight: 15}}>
          <Text style={styles.text}>{user}: </Text>
          <Text numberOfLines={1} style={styles.message}>
            {message}{' '}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default Group;

const styles = StyleSheet.create({
  group: {
    backgroundColor: '#3e3c42',
    height: 70,
    borderColor: 'white',
    borderBottomWidth: 1,
    width: '100%',
    paddingHorizontal: 10,
    paddingBottom: 10,
    borderBottomLeftRadius: 1,
    flexDirection: 'column',
  },
  groupTitle: {
    color: 'white',
    fontSize: 22,
    fontWeight: '600',
    paddingTop: 5,
    paddingBottom: 4,
  },
  text: {
    color: 'white',
    fontSize: 17,
  },
  message: {
    color: 'white',
    fontSize: 17,
    flex: 1,
  },
});
