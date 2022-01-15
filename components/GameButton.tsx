import React, {RefObject, useRef} from 'react';
import {
  Alert,
  Animated,
  Button,
  Pressable,
  StyleProp,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

interface Props {
  color: string;
  opacity: Animated.Value;
  onPress: () => Promise;
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
