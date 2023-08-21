import React from 'react';
import { Text, View, StyleSheet, StatusBar } from 'react-native';
import { COLORS } from '../theme/theme';
import VideoPlayer from 'react-native-media-console'; // Importa el componente

const PlayerVideo = ({ route }: any) => {
  const { videoUrl } = route.params;
  const resizeMode = 'contain'; // Definir el valor de resizeMode aquí

  return (
    <View style={styles.container}>
      <StatusBar hidden/>
      <VideoPlayer
        source={{ uri: videoUrl }}
        style={styles.video} // Establece el estilo aquí
        controls
        showOnStart
        showOnEnd
        disableFullscreen={false}
        toggleResizeModeOnFullscreen={true} // Puedes personalizar los controles según tus necesidades
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.Black,
  },
  text: {
    color: 'white',
  },
  video: {
    flex: 1,
    width: '100%', // Utiliza flex para que el reproductor ocupe todo el espacio disponible
  },
});

export default PlayerVideo;
