/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import "./aj/polyfill.react";
import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import { HelloWorldContainer } from './screen/helloworld';
import 'react-native-gesture-handler';

const StackNavigator = createStackNavigator({
  "Hello World": HelloWorldContainer,

},
{
  headerMode: 'screen',
  navigationOptions: {
    headerVisible: true,
  }
 });
 const App = createAppContainer(StackNavigator);

export default App;
