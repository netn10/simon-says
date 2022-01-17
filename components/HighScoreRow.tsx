import {Text} from 'react-native';
import React from 'react';

interface Props {
  playerName: string;
  score: number;
}

const HighScoreRow: React.FC<Props> = ({playerName, score}) => {
  return (
    <Text>
      {playerName} {score}
    </Text>
  );
};

export default HighScoreRow;
