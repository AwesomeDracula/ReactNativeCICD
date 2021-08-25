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
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import ProductList from '@features/product/ProductList';
import ProductDetail from '@features/product/ProductDetail';
import {RouteName} from 'common/constants';

type RootStackParamList = {
  ProductList: undefined;
  ProductDetail: {idProduct: string};
};

const Stack = createStackNavigator<RootStackParamList>();

const AppRoute = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name={'ProductList'} component={ProductList} />
        <Stack.Screen name={'ProductDetail'} component={ProductDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppRoute;
