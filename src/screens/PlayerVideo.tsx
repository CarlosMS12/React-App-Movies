import React, { useState, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { VLCPlayer } from 'react-native-vlc-media-player';
import { COLORS } from '../theme/theme';
/* import CustomIcon from '../components/CustomIcon'; */
import Feather from 'react-native-vector-icons/Feather';

const PlayerVideo = ({ route }: any) => {
  const { videoUrl } = route.params;
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const vlcPlayerRef = useRef<any>(null); // Usar any aquí

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    setShowControls(false);
  };

  const handlePlayerTouch = () => {
    setShowControls(!showControls);
  };

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
          onPlaying={() => {
            setShowControls(false);
          }}
        />
        {showControls && (
          <TouchableOpacity style={styles.playPauseButton} onPress={handlePlayPause}>
            <Feather name={isPlaying ? 'pause' : 'play'} style={styles.iconStyle}/>
            
          </TouchableOpacity>
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
  playPauseButton: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -25 }, { translateY: -25 }],
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconStyle: {
    fontSize: 24,
    color: COLORS.White,
  },
});

export default PlayerVideo;
