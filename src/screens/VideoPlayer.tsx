import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Video from 'react-native-video'; // Importar el componente Video de react-native-video

const VideoPlayer = () => {
  
  const resizeMode = 'contain'; // Definir el valor de resizeMode aquí

  return (
    <View style={styles.container}>
      <Text style={styles.text}>VideoPlayer</Text>
      <Video
        source={{ uri: 'https://ia801801.us.archive.org/31/items/magical-girl-lyrical-nanoha-reflection-2017/Dragon%20Ball%20Super%20Broly%20%282018%29.mp4' }}
        resizeMode={resizeMode} // Usar la variable aquí
        style={styles.video}
        controls // Usar esta propiedad en lugar de useNativeControls
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  text: {
    color: 'black',
  },
  video: {
    width: 300,
    height: 200,
    alignSelf: 'center',
  },
});

export default VideoPlayer;
