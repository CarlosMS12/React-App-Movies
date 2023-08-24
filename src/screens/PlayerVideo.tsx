import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Text } from 'react-native';
import { VLCPlayer } from 'react-native-vlc-media-player';
import Slider from '@react-native-community/slider'; // Import Slider from the community package
import { COLORS } from '../theme/theme';
import Feather from 'react-native-vector-icons/Feather';



const PlayerVideo = ({ route }: any) => {
  const { videoUrl } = route.params;
  const [isPlaying, setIsPlaying] = useState(true);
  const [showControls, setShowControls] = useState(true);
  const [currentTime, setCurrentTime] = useState(0); // Added for the slider
  const [totalTime, setTotalTime] = useState(0); // Added for the slider
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
    vlcPlayerRef.current.seek(20);
  };

  const handleJumpBackward = () => {
    vlcPlayerRef.current.seek(-20);
  };

  const handleSliderValueChange = (value: number) => {
    setCurrentTime(value);
  };

  const handleSliderSlidingComplete = (value: number) => {
    vlcPlayerRef.current.seek(value);
  };

  useEffect(() => {
    setIsPlaying(true);
  }, []);
  const formatTime = (milliseconds: number) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };
  const initOptions = [
    '--file-caching=15000',
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
          onProgress={(event: any) => {
            setCurrentTime(event.currentTime);
            setTotalTime(event.duration);
          }}
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
            {/* Slider for video progress */}
            <View style={styles.sliderContainer}>
              <Text style={styles.timeText}>{formatTime(Math.floor(currentTime))}</Text>
              <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={totalTime}
                value={currentTime}
                minimumTrackTintColor="#30a935"
                thumbTintColor="#30a935"
                onValueChange={handleSliderValueChange}
                onSlidingComplete={handleSliderSlidingComplete}
              />
              <Text style={styles.timeText}>{formatTime(Math.floor(totalTime))}</Text>
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
    transform: [{ translateY: -20 }],
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
  sliderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  slider: {
    flex: 1,
    marginHorizontal: 10,
  },
  timeText: {
    color: COLORS.White,
    fontSize: 12,
  },
});

export default PlayerVideo;
