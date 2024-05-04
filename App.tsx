import React from 'react';
import { StyleSheet, View } from 'react-native';
import ProfileData from './components/ProfileData';

const App: React.FC = () => {
  return (
    <View style={styles.container}>
      <ProfileData
        name="Jessica Randall"
        location="London, United Kingdom"
        description='"Front-end developer and avid reader".'
        imageUrl="https://social-links-profile-main-henna.vercel.app/_next/image?url=%2Fassets%2Fimages%2Favatar-jessica.jpeg&w=3840&q=75"
        links={[  ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0000',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;

