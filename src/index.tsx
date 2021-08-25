/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {Counter} from 'features/counter/Counter';
import {store} from '@app/store';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import AppRoute from 'app/AppRoute';

const App = () => {
  return (
    <Provider store={store}>
      <AppRoute />
    </Provider>
  );
};

export default App;
