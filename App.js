import React from 'react';
import { 
  StyleSheet, 
  FlatList, ListItem, List, 
  View, 
  Text, 
  TouchableOpacity, 
  Image } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import MapScreen from './MapScreen';
import FlatListDemo from './FlatListDemo';
import HomeScreen from './HomeScreen';

const RootStack = createStackNavigator({
    FlatListDemo: { screen: FlatListDemo },
    HomeScreen: { screen: HomeScreen },
    MapScreen: { screen: MapScreen }
  },
  {
    initialRouteName: 'HomeScreen',
  }
);
  
export default class App extends React.Component {
    render() {
        return <RootStack />;
    }
}