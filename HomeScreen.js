import React from 'react';
import { 
  View,
  StyleSheet, 
  Button,
} from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { List, ListItem, SearchBar } from "react-native-elements";

class HomeScreen extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      vehicles: []
    }
  }

  static navigationOptions = {
    title: 'Titulo',
  };
  
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
      <Button
        title="Go to MapScreen"
        onPress={() =>
          navigate('MapScreen', { name: 'Jane' })
        }
      />
      <Button
        title="Go to FlatListDemo"
        onPress={() =>
          navigate('FlatListDemo', { name: 'Jane' })
        }
      />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20
  },
});

export default HomeScreen;