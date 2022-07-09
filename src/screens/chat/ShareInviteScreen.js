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
import Clipboard from '@react-native-clipboard/clipboard';

import {getExistingGroupCode, getNewGroupCode} from '../../functions/chats';

const ShareInviteScreen = ({route}) => {
  const {groupId, groupName} = route.params;
  const [inviteCode, setInviteCode] = useState('');
  const [buttonLoading, setButtonLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const getCode = async () => {
    setIsLoading(true);
    try {
      const response = await getExistingGroupCode(groupId);
      console.log(response.data);
      if (new Date(response.data.expiryDate) <= new Date()) {
        console.log('expired');
      }
      if (
        response.data.expiryDate == null ||
        new Date(response.data.expiryDate) <= new Date() ||
        response.data.code == null
      ) {
        setInviteCode('');
      } else {
        setInviteCode(response.data.code);
      }
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  const generateCodeHandler = async () => {
    setButtonLoading(true);
    // setInviteCode('');
    try {
      const response = await getNewGroupCode(groupId);
      setInviteCode(response.data.code);
      Alert.alert(`Use this code to join this group`, 'Valid for 20 mins', [
        {text: 'Okay'},
      ]);
      console.log(response.data);
      setButtonLoading(false);
    } catch (err) {
      console.log(err);
      setButtonLoading(false);
    }
  };

  const copyCodeHandler = () => {
    Clipboard.setString(inviteCode);
  };

  useEffect(() => {
    getCode();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.page2}>
        <ActivityIndicator size="large" color="white" />
      </View>
    );
  }

  return (
    <View style={styles.page}>
      <Text style={styles.title}>{groupName}</Text>
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
            disabled={true}
            disabledInputStyle={styles.input}
            autoFocus
          />
        </View>
        {!!inviteCode && (
          <TouchableOpacity
            style={{marginLeft: 15, marginRight: 15, alignItems: 'center'}}
            onPress={copyCodeHandler}>
            <Icon
              name="content-copy"
              type="material-community"
              size={26}
              color="white"
              disabled={inviteCode == null ? true : false}
            />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Generate Code"
          buttonStyle={styles.button}
          loading={buttonLoading}
          loadingProps={{size: 'small', color: 'white'}}
          titleStyle={{color: 'white'}}
          onPress={generateCodeHandler}
        />
      </View>
    </View>
  );
};

export default ShareInviteScreen;

const styles = StyleSheet.create({
  page: {
    backgroundColor: 'black',
    flex: 1,
    alignItems: 'center',
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
