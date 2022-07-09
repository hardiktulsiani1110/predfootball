/* eslint-disable prettier/prettier */
import {StyleSheet, Alert, View} from 'react-native';
import {useSelector} from 'react-redux';
import React, {useState, useEffect} from 'react';
import {Input, Button} from 'react-native-elements';
import {createChatGroup} from '../../functions/chats';

const CreateGroupScreen = ({navigation}) => {
  const auth = useSelector(state => state.auth);
  const [name, setName] = useState('');
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const createGroupHandler = async () => {
    setIsLoading(true);
    if (name.trim().length < 3) {
      setError('Name should atleast have 3 characters');
      setIsLoading(false);
      return;
    }
    try {
      const response = await createChatGroup(name, auth.userId);
      navigation.goBack();
      setIsLoading(false);
    } catch (err) {
      setError(err.response.data.error);
      setIsLoading(false);
      console.log(err);
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
      <View style={styles.inputContainer}>
        <Input
          placeholder="Group Name"
          style={styles.input}
          value={name}
          type="text"
          onChangeText={text => setName(text)}
          autoFocus
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Create Group"
          buttonStyle={styles.button}
          loading={isLoading}
          loadingProps={{size: 'small', color: 'white'}}
          titleStyle={{color: 'white'}}
          onPress={createGroupHandler}
        />
      </View>
    </View>
  );
};

export default CreateGroupScreen;

const styles = StyleSheet.create({
  page: {
    backgroundColor: 'black',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 16,
  },
  input: {
    color: 'white',
  },
  inputContainer: {
    width: '75%',
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
});
