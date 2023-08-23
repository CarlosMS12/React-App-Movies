import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { VLCPlayer } from 'react-native-vlc-media-player';
import { COLORS } from '../theme/theme';
import Feather from 'react-native-vector-icons/Feather';

const PlayerVideo = ({ route }: any) => {
  const { videoUrl } = route.params;
  const [isPlaying, setIsPlaying] = useState(true);
  const [showControls, setShowControls] = useState(true);
  const vlcPlayerRef = useRef<any>(null);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    setShowControls(false);
  };

  const handlePlayerTouch = () => {
    setShowControls(!showControls);
  };

  const handlePlayerPlaying = () => {
    setShowControls(false);
  };

  const handlePlayerPaused = () => {
    setShowControls(true);
  };

  const handlePlayerStopped = () => {
    setShowControls(true);
  };

  const handlePlayerEnded = () => {
    setIsPlaying(false);
    setShowControls(true);
  };

  const handleJumpForward = () => {
    vlcPlayerRef.current.seek(20); // Saltar 20 segundos hacia adelante
  };

  const handleJumpBackward = () => {
    vlcPlayerRef.current.seek(-20); // Retroceder 20 segundos
  };

  useEffect(() => {
    setIsPlaying(true);
  }, []);

  const initOptions = [
    '--file-caching=15000', // Precarga de segmentos en milisegundos (20 segundos)
  ];

  return (
    <TouchableWithoutFeedback onPress={handlePlayerTouch}>
      <View style={styles.container}>
        <VLCPlayer
          ref={vlcPlayerRef}
          style={styles.video}
          videoAspectRatio="16:9"
          source={{ uri: videoUrl }}
          paused={!isPlaying}
          controls={true}
          playInBackground={true}
          initOptions={initOptions}
          onPlaying={handlePlayerPlaying}
          onPaused={handlePlayerPaused}
          onStopped={handlePlayerStopped}
          onEnded={handlePlayerEnded}
        />
        {showControls && (
          <>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.jumpButton} onPress={handleJumpBackward}>
                <Feather name="rewind" style={styles.iconStyle} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.playPauseButton} onPress={handlePlayPause}>
                <Feather name={isPlaying ? 'pause' : 'play'} style={styles.iconStyle} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.jumpButton} onPress={handleJumpForward}>
                <Feather name="fast-forward" style={styles.iconStyle} />
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.Black,
  },
  video: {
    flex: 1,
    width: '100%',
  },
  buttonContainer: {
    position: 'absolute',
    top: '50%',
    transform: [{ translateY: -20 }], // Ajuste para centrar verticalmente
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playPauseButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  jumpButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  iconStyle: {
    fontSize: 24,
    color: COLORS.White,
  },
});

export default PlayerVideo;
