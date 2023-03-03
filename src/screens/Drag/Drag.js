import {Dimensions, StyleSheet} from 'react-native';
import React from 'react';
import {PanGestureHandler} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withDecay,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {useHeaderHeight} from '@react-navigation/elements';

const {width, height} = Dimensions.get('window');
const BALL_SIZE = 100;

const Drag = () => {
  const isPressed = useSharedValue(false);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const headerHeight = useHeaderHeight();

  /* Limiting the drag to not offset the screen size. */
  const boundX = width - BALL_SIZE;
  const boundY = height - headerHeight * 3 - BALL_SIZE;

  const onGestureEvent = useAnimatedGestureHandler({
    onStart: (_event, context) => {
      isPressed.value = true;
      context.offsetX = translateX.value;
      context.offsetY = translateY.value;
    },
    onActive: (event, context) => {
      translateX.value = context.offsetX + event.translationX;
      translateY.value = context.offsetY + event.translationY;
    },
    onEnd: event => {
      // this will limit drag to not offset screen size
      translateX.value = withDecay({
        clamp: [0, boundX],
        velocity: event.velocityX,
      });
      translateY.value = withDecay({
        clamp: [0, boundY],
        velocity: event.velocityY,
      });
    },
    onFinish: () => {
      isPressed.value = withTiming(false);
    },
  });

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: translateX.value},
        {translateY: translateY.value},
        {scale: withSpring(isPressed.value ? 1.2 : 1)},
      ],
      backgroundColor: isPressed.value ? 'green' : 'blue',
    };
  });

  return (
    <PanGestureHandler onGestureEvent={onGestureEvent}>
      <Animated.View style={[styles.ball, animatedStyles]} />
    </PanGestureHandler>
  );
};

export default Drag;

const styles = StyleSheet.create({
  ball: {
    width: BALL_SIZE,
    height: BALL_SIZE,
    borderRadius: 100,
    backgroundColor: 'blue',
  },
});
