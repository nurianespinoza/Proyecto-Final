import React from 'react';
import { View } from 'react-native';
import LinkButton from './LinksButton';

interface LinksUnionProps {
  links: { url: string; text: string }[];
  onAddLinkPress: () => void;
  
}

const LinksUnion: React.FC<LinksUnionProps> = ({ links, onAddLinkPress }) => {
  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
      {links.map((link, index) => (
        <LinkButton key={index} link={link} onPress={() => console.log(`Navigate to ${link.url}`)} />
      ))}
      <LinkButton link={{ url: '', text: '+ New Link' }} onPress={onAddLinkPress} />
    </View>
  );
};

export default LinksUnionProps;