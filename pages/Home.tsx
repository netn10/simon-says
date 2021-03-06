import React, {useEffect, useRef, useState} from 'react';
import {Animated, Button, StyleSheet, Text, View, Modal} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import Sound from 'react-native-sound';
import GameButton from '../components/GameButton';
import Navigation from '../types/Navigate';
import sleep from '../utils/sleep';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {HIGH_SCORES_STORAGE_KEY} from '../commons';
import {HighScoresType} from '../types/HighScoresType';
import {findMin} from '../utils/findMin';
import {useAppDispatch, useAppSelector} from '../redux';
import {
  changeTurn,
  increaseScore,
  resetGame,
  setName,
  startGame,
  toggleModal,
} from '../redux/actions/gameActions';

// The four colored buttons
const gameButtons = [
  {
    id: 0,
    color: 'blue',
    sound: new Sound(require('../assets/0.wav'), Sound.MAIN_BUNDLE),
    opacity: new Animated.Value(1),
  },
  {
    id: 1,
    color: 'red',
    sound: new Sound(require('../assets/1.wav'), Sound.MAIN_BUNDLE),
    opacity: new Animated.Value(1),
  },
  {
    id: 2,
    color: 'yellow',
    sound: new Sound(require('../assets/2.wav'), Sound.MAIN_BUNDLE),
    opacity: new Animated.Value(1),
  },
  {
    id: 3,
    color: 'green',
    sound: new Sound(require('../assets/3.wav'), Sound.MAIN_BUNDLE),
    opacity: new Animated.Value(1),
  },
];

const fadeInOut = (opacity: Animated.Value) => {
  // Will change fadeAnim value to 0 in 1 seconds
  Animated.timing(opacity, {
    toValue: 0,
    duration: 100,
    useNativeDriver: true,
  }).start(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    }).start();
  });
};

const rowSize = 2;
const scoresListMaxSize = 10;

// Game logic:
/*
1. First turn - Simon choose 1 random button (0-3) and press it.
2. Each press adds to sequance.
3. Click and make a sound.
4. Player's turn - the same, each click checks the state (UseRef).
*/
/*
"score": [{name, score}]
*/
interface Props {
  navigation: Navigation;
}

const Home: React.FC<Props> = ({navigation}) => {
  const {isSimonTurn, isModalOpen, isStarted, playerName, score} =
    useAppSelector(state => state.gameState);
  const dispatch = useAppDispatch();

  const playerSequnceIndex = useRef(0);

  const sequence = useRef<number[]>([]);
  async function playSequence() {
    console.log(sequence.current);

    for (const sequenceElement of sequence.current) {
      await onButtonClick(sequenceElement);
      await sleep(1000);
    }
    dispatch(changeTurn());
  }

  const onButtonClick = async (buttonId: number) => {
    const gameButton = gameButtons[buttonId];
    fadeInOut(gameButton.opacity);
    gameButton.sound.play();
    if (isSimonTurn) return;

    if (sequence.current[playerSequnceIndex.current] === buttonId)
      playerSequnceIndex.current++;
    else {
      // game over
      console.log('game over!');
      dispatch(toggleModal());
      return;
    }

    if (playerSequnceIndex.current == sequence.current.length) {
      playerSequnceIndex.current = 0;
      dispatch(increaseScore());
      await sleep(1000);
      dispatch(changeTurn());
    }
  };

  async function onModalConfirm() {
    //SyncStorage.set(playerName, score);
    /*
{"all_data": [{name, score},{name, score}]}
*/
    try {
      const highScoresString = await AsyncStorage.getItem(
        HIGH_SCORES_STORAGE_KEY,
      );

      const highScores: HighScoresType = highScoresString
        ? JSON.parse(highScoresString)
        : [];

      const newScore = {playerName, score};
      const minScore = findMin(highScores.map(v => v.score));
      highScores.sort((a, b) => b.score - a.score);
      if (highScores.length < scoresListMaxSize) highScores.push(newScore);
      else if (minScore < score) highScores[scoresListMaxSize - 1] = newScore;

      await AsyncStorage.setItem(
        HIGH_SCORES_STORAGE_KEY,
        JSON.stringify(highScores),
      );
    } catch (e) {
      console.log(e);
    }

    sequence.current = [];
    playerSequnceIndex.current = 0;
    navigation.navigate('HighScores');
    dispatch(resetGame());
  }

  useEffect(() => {
    if (!isSimonTurn || !isStarted) return;
    const index = Math.floor(Math.random() * gameButtons.length);

    sequence.current.push(index);
    playSequence();
  }, [isSimonTurn, isStarted]);

  const turnText = isSimonTurn ? 'Simon Turn' : 'Your Turn';

  if (!isStarted)
    return <Button onPress={() => dispatch(startGame())} title="Start Game" />;

  return (
    <>
      <Modal visible={isModalOpen} animationType="slide" transparent={false}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 32}}>Game Over :(</Text>
          <Text style={{fontSize: 24}}>What is your name?</Text>
          <TextInput
            style={{backgroundColor: 'silver', width: '75%', margin: 10}}
            editable
            value={playerName}
            onChangeText={value => dispatch(setName(value))}
          />
          <Button
            title="Confirm"
            onPress={onModalConfirm}
            disabled={!playerName}
          />
        </View>
      </Modal>
      <Text>Score: {score}</Text>
      <Text>Turn: {turnText}</Text>
      <View
        style={[
          styles.container,
          {
            flexDirection: 'row',
          },
        ]}>
        {gameButtons
          .filter(v => v.id < rowSize)
          .map(v => (
            <GameButton
              key={v.id}
              isPlayerTurn={!isSimonTurn}
              opacity={v.opacity}
              color={v.color}
              onPress={async () => await onButtonClick(v.id)}
            />
          ))}
      </View>
      <View
        style={[
          styles.container,
          {
            flexDirection: 'row',
          },
        ]}>
        {gameButtons
          .filter(v => v.id >= rowSize)
          .map(v => (
            <GameButton
              key={v.id}
              isPlayerTurn={!isSimonTurn}
              opacity={v.opacity}
              color={v.color}
              onPress={async () => await onButtonClick(v.id)}
            />
          ))}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
  },
});

export default Home;
