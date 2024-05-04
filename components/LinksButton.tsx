import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

interface LinksButtonProps {
  link: { url: string; text: string };
  onPress: () => void;
  
}

const LinksButton: React.FC<LinksButtonProps> = ({ link, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={{ color: '#A367FA' }}>{link.text}</Text>
    </TouchableOpacity>
  );
};

export default LinksButton;