import React, {useEffect, useMemo, useState} from 'react';
import {Button, Text, View} from 'react-native';
import Navigation from '../types/Navigate';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {HIGH_SCORES_STORAGE_KEY} from '../commons';
import {HighScoresType} from '../types/HighScoresType';
import HighScoreRow from '../components/HighScoreRow';
import {useSelector} from 'react-redux';
import {useAppDispatch, useAppSelector} from '../redux';
import {loadHighScores} from '../redux/actions/highScoresActions';

const getData = async (): Promise<HighScoresType> => {
  try {
    const jsonValue = await AsyncStorage.getItem(HIGH_SCORES_STORAGE_KEY);
    console.log(jsonValue);
    return jsonValue ? JSON.parse(jsonValue) : [];
  } catch (e) {
    // error reading value
    console.log(e);
    return [];
  }
};

interface Props {
  navigation: Navigation;
}

const HighScores: React.FC<Props> = ({navigation}) => {
  const highscores = useAppSelector(state => state.highscores);
  const dispatch = useAppDispatch();

  useEffect(() => {
    getData().then(value => {
      value.sort((a, b) => b.score - a.score);
      dispatch(loadHighScores(value));
    });
  }, []);

  const clearHighScores = async () => {
    dispatch(clearHighScores());
    await AsyncStorage.setItem(HIGH_SCORES_STORAGE_KEY, '[]');
  };

  return (
    <View>
      {highscores?.map((li, i) => (
        <HighScoreRow key={i} playerName={li.playerName} score={li.score} />
      ))}
      <Button
        title="Restart Game"
        onPress={() => navigation.navigate('Home')}
      />
      <Button title="Clear Scores" color="pink" onPress={clearHighScores} />
    </View>
  );
};

export default HighScores;
