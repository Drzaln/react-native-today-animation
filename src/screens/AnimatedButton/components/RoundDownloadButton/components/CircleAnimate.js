import React from 'react';
import {useCallback} from 'react';
import {Pressable, View} from 'react-native';
import {StyleSheet} from 'react-native';
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedProps,
  withDelay,
} from 'react-native-reanimated';

import Svg, {Circle} from 'react-native-svg';
import ArrowDown from './ArrowDown';
import Bucket from './Bucket';
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export default CircleAnimate = ({
  bgStrokeColor = '#303858',
  strokeColor = '#589CEC',
  strokeWidth = 6,
  r = 40,
}) => {
  const progress = useSharedValue(0);
  const arrowAnimate = useSharedValue(0);
  const borderAnimate = useSharedValue(0);
  const textAnimate = useSharedValue(0);

  const CIRCLE_LENGTH = 2 * Math.PI * r; // 2PI*r

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: CIRCLE_LENGTH * (1 - progress.value),
  }));

  const animatedStyle = useAnimatedProps(() => ({
    transform: [
      {
        translateY: arrowAnimate.value ? withTiming(70) : withTiming(0),
      },
    ],
  }));

  const borderStyleAnimation = useAnimatedProps(() => ({
    borderWidth: borderAnimate.value ? withTiming(43) : withTiming(0),
  }));

  const textAnimationStyle = useAnimatedProps(() => ({
    opacity: textAnimate.value ? withTiming(1) : withTiming(0),
  }));

  const onPress = useCallback(() => {
    arrowAnimate.value = withTiming(!arrowAnimate.value, {duration: 800});
    progress.value = withDelay(
      400,
      withTiming(!progress.value, {duration: 2000}, () => {
        borderAnimate.value = withTiming(1, {}, isFinished => {
          if (isFinished) {
            textAnimate.value = withTiming(1, {}, isFinished => {
              if (isFinished) {
                progress.value = withDelay(800, withTiming(0));
                arrowAnimate.value = withDelay(800, withTiming(0));
                borderAnimate.value = withDelay(800, withTiming(0));
                textAnimate.value = withDelay(
                  800,
                  withTiming(0, {duration: 10}),
                );
              }
            });
          }
        });
      }),
    );
  }, []);

  return (
    <Pressable onPress={onPress} style={styles.mainContainer}>
      <Animated.View style={[styles.borderStyle, borderStyleAnimation]}>
        <View style={styles.textContainer}>
          <Animated.Text style={[styles.textStyle, textAnimationStyle]}>
            Done
          </Animated.Text>
        </View>
      </Animated.View>
      <View style={styles.arrowContainer}>
        <Animated.View style={animatedStyle}>
          <ArrowDown />
        </Animated.View>
        <Bucket />
      </View>
      <Svg
        width={r * 2 + strokeWidth}
        height={r * 2 + strokeWidth}
        style={{transform: [{rotate: `${Math.PI * 0.5}rad`}]}}>
        <Circle
          cx={r + strokeWidth / 2}
          cy={r + strokeWidth / 2}
          r={r}
          stroke={bgStrokeColor}
          strokeWidth={strokeWidth}
        />
        <AnimatedCircle
          cx={r + strokeWidth / 2}
          cy={r + strokeWidth / 2}
          r={r}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeDasharray={CIRCLE_LENGTH}
          animatedProps={animatedProps}
          strokeLinecap={'round'}
        />
      </Svg>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  textContainer: {
    position: 'absolute',
    zIndex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowContainer: {position: 'absolute', alignItems: 'center'},
  borderStyle: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    borderRadius: 100,
    zIndex: 2,
    borderColor: '#06D6A0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {fontSize: 18, fontWeight: 'bold', color: 'white'},
});
