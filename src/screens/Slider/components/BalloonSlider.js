import React from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useDerivedValue,
  useAnimatedProps,
  withTiming,
  withSpring,
} from 'react-native-reanimated';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import {clamp} from '../../../utils';
import AnimateableText from 'react-native-animateable-text';
const {width} = Dimensions.get('window');

const BalloonSlider = ({
  sliderWidth = width * 0.7,
  knobWidth = 35,
  maxRange = 100,
  trailColor = '#ddd',
  activeTrailColor = '#3f51b5',
  knobColor = '#757de8',
  textColor = 'white',
}) => {
  const translateX = useSharedValue(0);
  const startValue = useSharedValue(0);
  const littleKnobAnimate = useSharedValue(false);
  const isSliding = useSharedValue(false);
  const veloX = useSharedValue(0);

  const littleKnob = knobWidth - 25;
  const duration = 100;
  const springConfig = {mass: 1, velocity: 0, stiffness: 0.5};

  const angle = val => {
    'worklet';
    if (val > 100) {
      return withSpring('-16deg', {springConfig});
    } else if (val < -100) {
      return withSpring('16deg', {springConfig});
    } else {
      return withSpring('0deg', {springConfig});
    }
  };

  const gesture = Gesture.Pan()
    .onBegin(() => {
      littleKnobAnimate.value = true;
    })
    .onUpdate(e => {
      isSliding.value = true;
      translateX.value = clamp(
        e.translationX + startValue.value,
        0,
        sliderWidth - knobWidth,
      );
      veloX.value = e.velocityX - startValue.value;
    })
    .onEnd(() => {
      startValue.value = translateX.value;
      isSliding.value = false;
      littleKnobAnimate.value = false;
      veloX.value = 0;
    });

  const scrollTranslationStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: translateX.value}],
      borderRadius: littleKnobAnimate.value
        ? withTiming(knobWidth / 2, {duration})
        : withSpring(knobWidth / 3, {springConfig}),
    };
  });

  const animateBalloonContainer = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: withSpring(translateX.value, {springConfig})},
        {
          scale: littleKnobAnimate.value
            ? withSpring(1, {springConfig})
            : withTiming(0, {duration}),
        },
        {
          translateY: littleKnobAnimate.value
            ? withSpring(0, {springConfig})
            : withTiming(100, {duration}),
        },
        {
          rotateZ: angle(veloX.value),
        },
      ],
    };
  });

  const progressStyle = useAnimatedStyle(() => {
    return {
      width: translateX.value + knobWidth,
    };
  });

  const littleKnobStyle = useAnimatedStyle(() => {
    return {
      width: littleKnobAnimate.value
        ? withTiming(knobWidth - 5, {duration})
        : withSpring(littleKnob, {springConfig}),
      height: littleKnobAnimate.value
        ? withTiming(knobWidth - 5, {duration})
        : withSpring(littleKnob, {springConfig}),
      borderRadius: littleKnobAnimate.value
        ? withTiming(knobWidth / 2, {duration})
        : withSpring(littleKnob / 3, {springConfig}),
    };
  });

  const balloonText = useDerivedValue(() => {
    const sliderRange = sliderWidth - knobWidth;
    const oneStepValue = sliderRange / maxRange;
    const step = Math.floor(translateX.value / oneStepValue);

    return String(step);
  });

  return (
    <>
      <Animated.View
        pointerEvents="none"
        style={[
          {
            position: 'absolute',
            zIndex: 1,
            left: 46,
          },
          animateBalloonContainer,
        ]}>
        <Balloon
          balloonText={balloonText}
          tintColor={knobColor}
          textColor={textColor}
        />
      </Animated.View>
      <View style={styles.slider(knobWidth, sliderWidth, trailColor)}>
        <Animated.View
          style={[styles.progress(knobWidth, activeTrailColor), progressStyle]}
        />
        <GestureDetector gesture={gesture}>
          <Animated.View
            style={[styles.knob(knobWidth, knobColor), scrollTranslationStyle]}>
            <Animated.View
              style={[
                {
                  backgroundColor: 'white',
                },
                littleKnobStyle,
              ]}
            />
          </Animated.View>
        </GestureDetector>
      </View>
    </>
  );
};

export default BalloonSlider;

const styles = StyleSheet.create({
  slider: (knobWidth, sliderWidth, trailColor) => ({
    height: 2,
    width: sliderWidth,
    borderRadius: knobWidth / 2,
    backgroundColor: trailColor,
    justifyContent: 'center',
  }),
  progress: (knobWidth, activeTrailColor) => ({
    ...StyleSheet.absoluteFillObject,
    backgroundColor: activeTrailColor,
    borderRadius: knobWidth / 2,
  }),
  knob: (knobWidth, knobColor) => ({
    height: knobWidth,
    width: knobWidth,
    backgroundColor: knobColor,
    justifyContent: 'center',
    alignItems: 'center',
  }),
  ballonText: textColor => ({
    color: textColor,
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  }),

  container: {
    height: 60,
    width: 60,
  },
  textContainer: {
    height: '100%',
    width: '100%',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  balloonLeft: {
    position: 'absolute',
    height: '20%',
    width: '58.5%',
    transform: [{rotate: '46.5deg'}],
    left: '7%',
    bottom: '-4%',
    borderRadius: 9,
  },
  balloonRight: {
    position: 'absolute',
    height: '20%',
    width: '58.5%',
    transform: [{rotate: '-46.5deg'}],
    right: '7%',
    bottom: '-4%',
    borderRadius: 9,
  },
  knotCenter: {
    position: 'absolute',
    height: '8%',
    width: '18%',
    borderRadius: 10,
    bottom: '-32%',
    alignSelf: 'center',
  },
  knotRight: {
    position: 'absolute',
    height: '8%',
    width: '14.5%',
    transform: [{rotate: '-48deg'}],
    right: '46%',
    bottom: '-29.5%',
    borderRadius: 10,
  },
  knotLeft: {
    position: 'absolute',
    height: '8%',
    width: '14.5%',
    transform: [{rotate: '48deg'}],
    right: '40%',
    bottom: '-29.5%',
    borderRadius: 10,
  },
});

const Balloon = ({balloonText, tintColor, textColor}) => {
  const animatedProps = useAnimatedProps(() => {
    return {
      text: balloonText.value,
    };
  });
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.textContainer,
          {
            backgroundColor: tintColor,
          },
        ]}>
        <AnimateableText
          style={styles.ballonText(textColor)}
          animatedProps={animatedProps}
        />
      </View>
      <View
        style={[
          styles.balloonLeft,
          {
            backgroundColor: tintColor,
          },
        ]}
      />
      <View
        style={[
          styles.balloonRight,
          {
            backgroundColor: tintColor,
          },
        ]}
      />
      <View
        style={[
          styles.knotCenter,
          {
            backgroundColor: tintColor,
          },
        ]}
      />
      <View
        style={[
          styles.knotRight,
          {
            backgroundColor: tintColor,
          },
        ]}
      />
      <View
        style={[
          styles.knotLeft,
          {
            backgroundColor: tintColor,
          },
        ]}
      />
    </View>
  );
};
