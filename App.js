/* eslint-disable prettier/prettier */
// // symbol polyfills
// global.Symbol = require('core-js/es6/symbol');
// require('core-js/fn/symbol/iterator');

// // collection fn polyfills
// require('core-js/fn/map');
// require('core-js/fn/set');
// require('core-js/fn/array/find');
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import ReduxThunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import Navigation from './src/navigation/index';

import authReducer from './src/reducers/auth';

const rootReducer = combineReducers({
  auth: authReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(ReduxThunk)),
);

const App = () => {
  return (
    <Provider store={store}>
      <View style={{flex: 1}}>
        <StatusBar barStyle={'dark-content'} />
        <Navigation />
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({});

export default App;
