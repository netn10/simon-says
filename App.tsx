import React from 'react';
import {SafeAreaView} from 'react-native';
import 'react-native-gesture-handler';

import Home from './pages/Home';
import HighScores from './pages/HighScores';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider} from 'react-redux';
import {store} from './redux';

const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home" detachInactiveScreens>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="HighScores" component={HighScores} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
