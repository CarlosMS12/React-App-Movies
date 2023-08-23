import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, PanResponder, TouchableWithoutFeedback } from 'react-native';

interface CustomSliderProps {
  min: number;
  max: number;
  value: number;
  onValueChange: (value: number) => void;
  componentWidth: number;
}

const CustomSlider: React.FC<CustomSliderProps> = ({ min, max, value, onValueChange, componentWidth }) => {
  const [sliderValue, setSliderValue] = useState(value);
  const [isTouching, setIsTouching] = useState(false);
  const [lastTouchedX, setLastTouchedX] = useState(0);

  const calculateNewValue = (xPosition: number) => {
    const percent = xPosition / componentWidth;
    const newValue = min + (max - min) * percent;
    return Math.max(min, Math.min(max, newValue));
  };

  useEffect(() => {
    if (!isTouching) {
      // Actualiza el valor del slider cuando no se está tocando
      setSliderValue(value);
    }
  }, [isTouching, value]);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gestureState) => {
      const newValue = calculateNewValue(gestureState.moveX);
      setSliderValue(newValue);
      setIsTouching(true);
      onValueChange(newValue);
    },
    onPanResponderRelease: () => {
      setIsTouching(false);
      // Realiza acciones cuando se suelta el dedo
    },
  });

  const handleTouch = (event: any) => {
    const xPosition = event.nativeEvent.locationX;

    // Si el toque actual está en el mismo punto y ya está siendo tocado, no actualices
    if (isTouching && Math.abs(xPosition - lastTouchedX) < 5) {
      return;
    }

    const newValue = calculateNewValue(xPosition);
    setSliderValue(newValue);
    setLastTouchedX(xPosition);
    onValueChange(newValue);
  };

  return (
    <TouchableWithoutFeedback onPress={handleTouch}>
      <View style={styles.container} {...panResponder.panHandlers}>
        <View style={styles.track} />
        <View
          style={[
            styles.thumb,
            {
              left: (sliderValue - min) / (max - min) * componentWidth - 10, // Ajuste para centrar el pulgar
            },
          ]}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 20,
    justifyContent: 'center',
  },
  track: {
    width: '100%',
    height: 2,
    backgroundColor: '#ccc',
  },
  thumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'blue',
    position: 'absolute',
  },
});

export default CustomSlider;
