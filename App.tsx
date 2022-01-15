import React from 'react';
import {SafeAreaView} from 'react-native';
import 'react-native-gesture-handler';

import Home from './pages/Home';
import HighScores from './pages/HighScores';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="HighScores" component={HighScores} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
