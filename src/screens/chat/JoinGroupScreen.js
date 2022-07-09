/* eslint-disable prettier/prettier */
import {
  StyleSheet,
  Alert,
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Input, Button, Icon} from 'react-native-elements';
import {useSelector} from 'react-redux';

import {joinGroup} from '../../functions/chats';

const JoinGroupScreen = ({navigation}) => {
  const auth = useSelector(state => state.auth);
  const [inviteCode, setInviteCode] = useState('');
  const [buttonLoading, setButtonLoading] = useState(false);
  const [error, setError] = useState();

  const joinGroupHandler = async () => {
    setButtonLoading(true);
    try {
      const response = await joinGroup(inviteCode, auth.userId);

      Alert.alert('Success', `${response.data.message}`, [{text: 'Okay'}]);
      setButtonLoading(false);
      navigation.goBack();
      // console.log(response.data);
    } catch (err) {
      console.log(err);
      setError(err.response.data.error);
      setButtonLoading(false);
    }
  };

  useEffect(() => {
    if (error) {
      Alert.alert('An Error Occurred!', error, [{text: 'Okay'}]);
      setError(null);
    }
  }, [error]);

  return (
    <View style={styles.page}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View style={styles.inputContainer}>
          <Input
            placeholder="Invite code"
            style={styles.input}
            value={inviteCode}
            type="text"
            onChangeText={text => setInviteCode(text)}
            autoFocus
          />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Join Group"
          buttonStyle={styles.button}
          loading={buttonLoading}
          loadingProps={{size: 'small', color: 'white'}}
          titleStyle={{color: 'white'}}
          onPress={joinGroupHandler}
        />
      </View>
    </View>
  );
};

export default JoinGroupScreen;

const styles = StyleSheet.create({
  page: {
    backgroundColor: 'black',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  page2: {
    backgroundColor: 'black',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    color: 'white',
    justifyContent: 'center',
  },
  inputContainer: {
    width: '55%',
    minWidth: 250,
  },
  buttonContainer: {
    width: '40%',
    minWidth: 80,
  },
  button: {
    backgroundColor: '#3e3c42',
    borderRadius: 10,
    marginTop: 15,
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 24,
    marginTop: '45%',
    marginBottom: '10%',
  },
});
