import React from 'react';
import {Animated} from 'react-native';

interface Props {
  color: string;
  opacity: Animated.Value;
  onPress: () => Promise<void>;
  isPlayerTurn: boolean;
}

function GameButton({color, opacity, isPlayerTurn, onPress}: Props) {
  async function onPressWrapper() {
    if (!isPlayerTurn) return;
    await onPress();
  }
  return (
    <Animated.View
      onTouchStart={onPressWrapper}
      style={{flex: 1, backgroundColor: color, marginLeft: 10, opacity}}
    />
  );
}

export default GameButton;
