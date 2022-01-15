import React from 'react';
import {Button, View} from 'react-native';
import Navigation from '../types/Navigate';

interface Props {
  navigation: Navigation;
}

const HighScores: React.FC<Props> = ({navigation}) => {
  return (
    <View>
      <Button
        title="Restart Game"
        onPress={() => navigation.navigate('Home')}
      />
    </View>
  );
};

export default HighScores;
