import React from 'react';
import { View, StyleSheet } from 'react-native';
import CommonVideo from '../components/VideoPlayer'; // Ajusta la ruta según la estructura de tu proyecto

const TicketScreen = () => {
  // URL del video que deseas reproducir
  const videoUrl = 'https://streamtape.com/get_video?id=9yqXWarlzVUaawX&expires=1692830817&ip=F0uTKRgPKxSHDN&token=INqI9VSjnVss&stream=1';

  return (
    <View style={styles.container}>
      <CommonVideo
        url={videoUrl}
        isFull={false}
        
        showBack={false} // Mostrar el botón de retroceso
        showTitle={false} // Mostrar el título
        onEnd={() => {
          console.log('Video terminado');
          // Aquí puedes realizar acciones cuando el video termine de reproducirse
        }}
        style={{ width: '100%', height: '100%' }}
         
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default TicketScreen;
