import React, { RefObject, useEffect, useRef, useState } from "react";
import { Animated, Button, StyleSheet, Text, TouchableOpacity, View, Pressable } from "react-native";
import Sound from 'react-native-sound';
import GameButton from "../components/GameButton";
import sleep from '../utils/sleep';

const gameButtons = [
    {
        id: 0,
        color: "blue",
        sound: new Sound(require('../assets/0.mp3'), Sound.MAIN_BUNDLE),
        opacity: new Animated.Value(1)
    },
    {
        id: 1,
        color: "red",
        sound: new Sound(require('../assets/1.wav'), Sound.MAIN_BUNDLE),
        opacity: new Animated.Value(0)
    },
    {
        id: 2,
        color: "yellow",
        sound: new Sound(require('../assets/2.wav'), Sound.MAIN_BUNDLE),
        opacity: new Animated.Value(0)
    },
    {
        id: 3,
        color: "green",
        sound: new Sound(require('../assets/3.wav'), Sound.MAIN_BUNDLE),
        opacity: new Animated.Value(0)
    }
]

const rowSize = 2;

// Game logic:
/*
1. First turn - Simon choose 1 random button (0-3) and press it.
2. Each press adds to sequance.
3. Click and make a sound.
4. Player's turn - the same, each click checks the state (UseRef).
*/

const Home = () => {
    const [isStarted, setIsStarted] = useState(false);
    const [score, setScore] = useState(0);
    const [isSimonTurn, setIsSimonTurn] = useState(true);
    const playerSequnceIndex = useRef(0);

    const sequence = useRef<number[]>([]);
    async function playSequence() {
      console.log(sequence.current);
 
      for(const sequenceElement of sequence.current) {
        onButtonClick(sequenceElement);
        await sleep(1000);

      }
      setIsSimonTurn(false);
    } 

    const onButtonClick = (buttonId: number) => {
      const gameButton = gameButtons[buttonId];
      gameButton.sound.play();
      if(isSimonTurn)
        return;
      
      if(sequence.current[playerSequnceIndex.current] === buttonId)
        playerSequnceIndex.current++;
      else {
        // game over
        console.log('game over!');
        
        return;
      }
      
      if(playerSequnceIndex.current == sequence.current.length) {
        playerSequnceIndex.current = 0;
        setScore(prev => prev + 1);
        setIsSimonTurn(true);
      }
    }

    
    useEffect(() => {
      if(!isSimonTurn || !isStarted)
        return;
      const index = Math.floor( Math.random() * (gameButtons.length - 1));
      sequence.current.push(index);
      playSequence();

    }, [isSimonTurn, isStarted])


    if(!isStarted)
        return <Button onPress={() => setIsStarted(true)} title="Start Game"/>
 
  

  return (
      <>
    <Text>High Score: {score}</Text>
    <View style={[styles.container, {
      flexDirection: "row"
    }]}>
        {gameButtons.filter(v => v.id < rowSize).map(v => <GameButton key={v.id} isPlayerTurn={!isSimonTurn} opacity={v.opacity} color={v.color} onPress={() => onButtonClick(v.sound)}/>)}
    </View>
        <View style={[styles.container, {
      flexDirection: "row"
    }]}>
        {gameButtons.filter(v => v.id >= rowSize).map(v => <GameButton key={v.id} isPlayerTurn={!isSimonTurn} opacity={v.opacity} color={v.color} onPress={() => onButtonClick(v.sound)}/>)}

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

