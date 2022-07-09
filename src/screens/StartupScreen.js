/* eslint-disable prettier/prettier */
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect} from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';

const StartupScreen = ({navigation}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem('userData');
      if (!userData) {
        navigation.navigate('Auth');
        return;
      }
      const transformedData = JSON.parse(userData);
      const {userId, expiryDate, email, username} = transformedData;
      const expirationDate = new Date(expiryDate);

      if (expirationDate <= new Date() || !userId || !username || !email) {
        navigation.navigate('Auth');
        return;
      }

      const newExpiryDate = new Date(
        new Date().getTime() + 3 * 24 * 60 * 60 * 1000,
      );
      await AsyncStorage.setItem(
        'userData',
        JSON.stringify({
          email,
          username,
          userId,
          expiryDate: newExpiryDate,
        }),
      );
      dispatch({
        type: 'AUTHENTICATE',
        userId: userId,
        email: email,
        username: username,
      });
      navigation.navigate('MatchesChats');
    };

    tryLogin();
  }, [dispatch]);

  return (
    <View style={styles.screen}>
      <ActivityIndicator size="large" color="#6113d6" />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default StartupScreen;
