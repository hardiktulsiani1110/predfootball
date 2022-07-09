/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {Icon} from 'react-native-elements';
import {getChatGroups} from '../../functions/chats';
import Group from '../../components/chat/Group';

const renderItem = itemData => {
  return (
    <Group
      groupId={itemData?.item?._id}
      groupName={itemData?.item?.name}
      admin={itemData?.item?.admin}
    />
  );
};

const ChatsScreen = ({navigation}) => {
  const auth = useSelector(state => state.auth);
  const isFocused = useIsFocused();
  const [isLoading, setIsLoading] = useState(false);
  const [groups, setGroups] = useState([]);
  const [showActions, setShowActions] = useState(false);

  const loadGroups = async () => {
    setIsLoading(true);
    try {
      const response = await getChatGroups(auth.email);
      setGroups(response.data.groups);
      // console.log(groups);
      setIsLoading(false);
    } catch (err) {
      console.log('ChatsScreen', err);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadGroups();
    return () => {
      setShowActions(false);
    };
  }, [isFocused]);

  if (isLoading) {
    return (
      <View style={styles.page2}>
        <ActivityIndicator size="large" color="white" />
      </View>
    );
  }
  return (
    <View style={styles.page}>
      <FlatList
        data={groups}
        keyExtractor={item => item._id}
        renderItem={renderItem}
      />
      {showActions && (
        <View style={{position: 'absolute', bottom: 85, right: 50}}>
          <TouchableOpacity
            style={[
              styles.action,
              {borderTopLeftRadius: 15, borderTopRightRadius: 15},
            ]}
            onPress={() => navigation.navigate('CreateGroup')}>
            <Text style={styles.actionText}>Create Group</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.action, {borderBottomLeftRadius: 15}]}
            onPress={() => navigation.navigate('JoinGroup')}>
            <Text style={styles.actionText}>Join Group</Text>
          </TouchableOpacity>
        </View>
      )}
      <TouchableOpacity
        style={{position: 'absolute', bottom: 10, right: 10}}
        onPress={() => setShowActions(!showActions)}>
        <Icon name="add-circle" type="ionicon" size={65} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default ChatsScreen;

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
  },
  action: {
    backgroundColor: 'white',
    height: 44,
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
    fontWeight: '400',
  },
  memberList: {
    flexDirection: 'row',
    marginLeft: 25,
    marginRight: 30,
    paddingRight: 15,
  },
});
