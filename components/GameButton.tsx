import React, { RefObject } from 'react';
import { Alert, Animated, Button, Pressable, StyleProp, Text, TouchableOpacity, View, ViewStyle } from 'react-native'

interface Props {
    color: string;
    opacity: any;
    onPress: () => void;
    isPlayerTurn: boolean;
}


function GameButton({color, opacity, isPlayerTurn, onPress}: Props) {
    console.log(opacity);
    function onPressWrapper() {
        if(!isPlayerTurn)
            return;
        onPress();
    }
    return (
            <View onTouchStart={onPressWrapper}  style={{flex: 1, backgroundColor: color, marginLeft: 10, opacity: 1}}/>
    )
}


export default GameButton
