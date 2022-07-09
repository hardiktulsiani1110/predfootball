/* eslint-disable prettier/prettier */
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Alert} from 'react-native';
import {Input, Button} from 'react-native-elements';
import {useDispatch} from 'react-redux';
import {login} from '../../functions/auth';

const LoginScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [error, setError] = useState();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (error) {
      Alert.alert('An Error Occurred!', error, [{text: 'Okay'}]);
    }
  }, [error]);

  const loginSubmitHandler = async () => {
    setError(null);
    setIsLoading(true);
    try {
      const response = await login(email, password);
      dispatch({
        type: 'AUTHENTICATE',
        userId: response.data._id,
        email: response.data.email,
        username: response.data.username,
      });
      const newExpiryDate = new Date(
        new Date().getTime() + 3 * 24 * 60 * 60 * 1000,
      );
      await AsyncStorage.setItem(
        'userData',
        JSON.stringify({
          email: response.data.email,
          username: response.data.username,
          userId: response.data._id,
          expiryDate: newExpiryDate,
        }),
      );
      navigation.replace('MatchesChats');
      setIsLoading(false);
    } catch (err) {
      setError(err.response.data.error);
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.page}>
      <Text style={styles.title}>PredFootball</Text>
      <Text style={styles.subTitle}>Login</Text>
      <View style={styles.inputContainer}>
        <Input
          placeholder="Email Address"
          style={styles.input}
          value={email}
          type="email"
          onChangeText={text => setEmail(text)}
          autoFocus
        />
        <Input
          placeholder="Password"
          style={styles.input}
          value={password}
          secureTextEntry={true}
          onChangeText={text => setPassword(text)}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Login"
          loading={isLoading}
          loadingProps={{size: 'small', color: 'white'}}
          buttonStyle={styles.login}
          onPress={loginSubmitHandler}
        />
        <Button
          title="Register"
          buttonStyle={styles.register}
          titleStyle={{color: 'black'}}
          onPress={() => navigation.replace('Register')}
        />
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  page: {
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'black',
    width: '100%',
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 36,
    marginTop: '18%',
    marginBottom: '8%',
  },
  subTitle: {
    color: 'white',
    // fontWeight: 'bold',
    fontSize: 28,
    marginBottom: '12%',
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
  login: {
    backgroundColor: '#3e3c42',
    borderRadius: 10,
    marginTop: 20,
  },
  register: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginTop: 25,
  },
});
