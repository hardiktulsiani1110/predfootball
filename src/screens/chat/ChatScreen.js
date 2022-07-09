/* eslint-disable prettier/prettier */
import React, {useEffect, useState, useRef} from 'react';
import {FlatList, TouchableOpacity} from 'react-native';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {Icon} from 'react-native-elements';
import {BACKEND_URL} from '@env';

import MyChat from '../../components/chat/MyChat';
import OtherChat from '../../components/chat/OtherChat';

import {io} from 'socket.io-client';
import {getGroupChats, leaveGroup} from '../../functions/chats';

const ChatScreen = ({navigation, route}) => {
  const socketRef = useRef();
  const isFocused = useIsFocused();
  const auth = useSelector(state => state.auth);
  const {groupId, groupName, admin} = route.params;
  const [showActions, setShowActions] = useState(false);
  const [isLoading, setIsLoading] = useState(true); //changed
  const [chats, setChats] = useState([]);
  const [chatMessage, setChatMessage] = useState('');

  const loadSocket = async () => {
    socketRef.current = io(`${BACKEND_URL}/`, {
      transports: ['websocket'],
    });
    const socket = socketRef.current;
    console.log('socket.io client initiated');
    socket.emit('join', groupId);
    socket.on('joined', async () => {
      // setIsLoading(true);
      const res = await getGroupChats(groupId);
      setChats(res.data);
      setIsLoading(false);
    });
  };
  const leaveGroupHandler = () => {
    setIsLoading(true);
    Alert.alert('Are you sure?', 'Do you really want to leave this group?', [
      {text: 'No', style: 'default'},
      {
        text: 'Yes',
        style: 'destructive',
        onPress: async () => {
          const response = await leaveGroup(groupId, auth.userId);
          Alert.alert('Success', `${response.data.message}`, [{text: 'Okay'}]);
          navigation.replace('Chats');
          setIsLoading(false);
        },
      },
    ]);

    setIsLoading(false);
  };
  useEffect(() => {
    navigation.setOptions({
      title: groupName,
      headerRight: () => (
        <TouchableOpacity onPress={() => setShowActions(value => !value)}>
          <Icon
            name="dots-vertical"
            type="material-community"
            size={26}
            color="black"
          />
        </TouchableOpacity>
      ),
    });
    loadSocket();
    socketRef.current.on('message', async newChat => {
      setChats(oldChat => [newChat, ...oldChat]);
    });
    return () => {
      console.log('client disconnecting');
      socketRef.current.disconnect();
      setShowActions(false);
    };
  }, [isFocused]);

  const renderChatMessage = itemData => {
    if (itemData?.item?.sentBy?._id == auth.userId) {
      return <MyChat chatData={itemData?.item} />;
    }
    return <OtherChat chatData={itemData?.item} />;
  };

  const sendChatMessage = () => {
    if (chatMessage.length === 0) return;
    socketRef.current.emit('message', groupId, auth.userId, chatMessage);
    setChatMessage('');
  };

  if (isLoading) {
    return (
      <View style={styles.page2}>
        <ActivityIndicator size="large" color="white" />
      </View>
    );
  }
  return (
    <View style={styles.page}>
      {showActions && (
        <View style={{position: 'absolute', top: 0, right: 0, zIndex: 2}}>
          {admin._id === auth.userId && (
            <TouchableOpacity
              style={styles.action}
              onPress={() => {
                navigation.push('ShareInvite', {
                  groupId: groupId,
                  groupName: groupName,
                });
                // setShowActions(false);
              }}>
              <Text style={styles.actionText}>Share Invitation</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={styles.action}
            onPress={() => {
              navigation.navigate('ViewMembers', {groupId, groupName});
              // setShowActions(false);
            }}>
            <Text style={styles.actionText}>View Members</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.action}
            onPress={() => {
              navigation.navigate('ViewPredictions', {groupId, groupName});
              // setShowActions(false);
            }}>
            <Text style={styles.actionText}>View Predictions</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.action} onPress={leaveGroupHandler}>
            <Text style={styles.actionText}>Leave Group</Text>
          </TouchableOpacity>
        </View>
      )}
      <View style={{marginBottom: 45}}>
        <FlatList
          data={chats}
          keyExtractor={item => item._id}
          renderItem={renderChatMessage}
          inverted
        />
      </View>
      <View style={styles.bottomView}>
        <TextInput
          style={styles.input}
          value={chatMessage}
          onChangeText={text => setChatMessage(text)}
          placeholder="Type your message"
          placeholderTextColor="grey"
        />
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: 32,
          }}>
          <TouchableOpacity onPress={sendChatMessage}>
            <Icon name="send" type="ionicon" color="white" size={24} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  page: {
    backgroundColor: 'black',
    flex: 1,
  },
  page2: {
    backgroundColor: 'black',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 16,
  },
  input: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    borderColor: 'white',
    width: '80%',
    borderRadius: 25,
    backgroundColor: 'white',
    left: 5,
    color: 'black',
  },
  bottomView: {
    position: 'absolute',
    bottom: 1,
    width: '100%',
    flexDirection: 'row',
  },
  action: {
    backgroundColor: 'white',
    height: 40,
    borderColor: 'black',
    // width: '40%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderBottomWidth: 0,
    padding: 10,
  },
  actionText: {
    color: 'black',
    fontSize: 16,
    fontWeight: '500',
  },
});
