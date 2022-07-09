/* eslint-disable prettier/prettier */
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Alert} from 'react-native';
import {Input, Button} from 'react-native-elements';
import * as EmailValidator from 'email-validator';
import {useDispatch} from 'react-redux';
import {register} from '../../functions/auth';

const RegisterScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [error, setError] = useState();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (error) {
      Alert.alert('An Error Occurred!', error, [{text: 'Okay'}]);
    }
  }, [error]);

  const registerSubmitHandler = async () => {
    setError(null);
    setIsLoading(true);
    var ans = await EmailValidator.validate(email);
    console.log(ans);
    if (!ans) {
      setError('Enter valid email address');
      setIsLoading(false);
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      setIsLoading(false);
      return;
    }
    if (confirmPassword !== password) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }
    try {
      const response = await register(email, password);
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
      <Text style={styles.subTitle}>Register</Text>
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
        <Input
          placeholder="Confirm Password"
          style={styles.input}
          value={confirmPassword}
          secureTextEntry={true}
          onChangeText={text => setConfirmPassword(text)}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Register"
          buttonStyle={styles.register}
          onPress={registerSubmitHandler}
          loading={isLoading}
          loadingProps={{size: 'small', color: 'white'}}
        />
        <Button
          title="Login"
          buttonStyle={styles.login}
          titleStyle={{color: 'black'}}
          onPress={() => navigation.replace('Login')}
        />
      </View>
    </View>
  );
};

export default RegisterScreen;

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
    marginTop: '14%',
    marginBottom: '7%',
  },
  subTitle: {
    color: 'white',
    // fontWeight: 'bold',
    fontSize: 28,
    marginBottom: '10%',
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
  register: {
    backgroundColor: '#3e3c42',
    borderRadius: 10,
    marginTop: 20,
  },
  login: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginTop: 25,
  },
});
