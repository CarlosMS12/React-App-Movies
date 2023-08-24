import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
// Ajusta la ruta según la estructura de tu proyecto

const TicketScreen = () => {
  // URL del video que deseas reproducir
  const videoUrl = 'https://streamtape.com/get_video?id=9yqXWarlzVUaawX&expires=1692830817&ip=F0uTKRgPKxSHDN&token=INqI9VSjnVss&stream=1';

  return (
    <View style={styles.container}>
      <StatusBar hidden/>
      
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
