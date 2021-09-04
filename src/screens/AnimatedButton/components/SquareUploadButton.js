import React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';

const SquareUploadButton = () => {
  const loadBar = useSharedValue('0%');
  const expandBar = useSharedValue('9%');

  const loadAnimation = useAnimatedStyle(() => {
    return {
      width: loadBar.value,
      height: expandBar.value,
    };
  });

  const onPressed = () => {
    loadBar.value = withTiming('100%', {duration: 1000}, isFinished => {
      if (isFinished) {
        expandBar.value = withTiming('100%', {duration: 450}, isFinished => {
          if (isFinished) {
            loadBar.value = withDelay(600, withTiming('0%', {duration: 1}));
            expandBar.value = withDelay(600, withTiming('9%', {duration: 1}));
          }
        });
      }
    });
  };

  return (
    <Pressable onPress={onPressed} style={styles.container}>
      <Text style={styles.uploadText}>Upload</Text>
      <Animated.View style={[styles.animateContainer, loadAnimation]}>
        <Text style={styles.successContainer}>Success</Text>
      </Animated.View>
    </Pressable>
  );
};

export default SquareUploadButton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0f4c5c',
    width: '35%',
    height: 45,
    justifyContent: 'center',
  },
  uploadText: {fontWeight: '700', color: 'white', textAlign: 'center'},
  animateContainer: {
    backgroundColor: '#9ef01a',
    position: 'absolute',
    bottom: 0,
    justifyContent: 'center',
  },
  successContainer: {fontWeight: '700', color: '#0d1b2a', textAlign: 'center'},
});
