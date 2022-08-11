import {Dimensions, ScrollView, StyleSheet, View} from 'react-native';
import React from 'react';
import Animated, {
  useAnimatedProps,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import {clamp} from '../../utils';
import AnimateableText from 'react-native-animateable-text';
import MaskedView from '@react-native-masked-view/masked-view';
const {width} = Dimensions.get('window');

const borderRadius = 12,
  sliderWidth = width * 0.7,
  knobWidth = 35,
  maxRange = 100,
  trailColor = 'rgb(72,72,74)',
  activeTrailColor = 'rgb(10,132,255)',
  knobColor = 'rgb(209,209,214)';

const IBattery = () => {
  const translateX = useSharedValue(0);
  const isSliding = useSharedValue(false);
  const startValue = useSharedValue(0);

  const stepText = useDerivedValue(() => {
    const sliderRange = sliderWidth - knobWidth;
    const oneStepValue = sliderRange / maxRange;
    const step = Math.floor(translateX.value / oneStepValue);

    return String(step);
  });

  const gesture = Gesture.Pan()
    .onUpdate(e => {
      isSliding.value = true;
      translateX.value = clamp(
        e.translationX + startValue.value,
        0,
        sliderWidth - knobWidth,
      );
    })
    .onEnd(() => {
      isSliding.value = false;
      startValue.value = translateX.value;
    });

  const scrollTranslationStyle = useAnimatedStyle(() => {
    return {transform: [{translateX: translateX.value}]};
  });

  const progressStyle = useAnimatedStyle(() => {
    return {
      width: translateX.value + knobWidth,
    };
  });

  const capacityStyle = useAnimatedStyle(() => {
    return {
      width: `${stepText.value}%`,
      backgroundColor:
        stepText.value > 20
          ? stepText.value === '100'
            ? 'rgb(209,209,214)'
            : 'rgb(48,209,88)'
          : 'rgb(255,69,58)',
    };
  });

  const darkStyle = useAnimatedStyle(() => {
    return {
      width: `${stepText.value}%`,
    };
  });

  const animatedProps = useAnimatedProps(() => {
    return {
      text: stepText.value,
    };
  });

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.batteryContainer}>
        <View style={styles.battery}>
          <Animated.View style={[styles.batteryCapacity, capacityStyle]} />
          <View style={styles.textContainer}>
            <MaskedView
              style={styles.mask}
              maskElement={
                <View style={styles.textWrapper}>
                  <AnimateableText
                    animatedProps={animatedProps}
                    style={styles.text}
                  />
                </View>
              }>
              <Animated.View style={[styles.dark, darkStyle]} />
              <View style={styles.light} />
            </MaskedView>
          </View>
        </View>
        <View style={styles.capContainer}>
          <View style={styles.batteryCap} />
        </View>
      </View>

      <View style={styles.slider(knobWidth, sliderWidth, trailColor)}>
        <Animated.View
          style={[styles.progress(knobWidth, activeTrailColor), progressStyle]}
        />
        <GestureDetector gesture={gesture}>
          <Animated.View
            style={[styles.knob(knobWidth, knobColor), scrollTranslationStyle]}
          />
        </GestureDetector>
      </View>
    </ScrollView>
  );
};

export default IBattery;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 16,
    backgroundColor: 'rgb(44,44,46)',
    flex: 1,
  },
  batteryContainer: {flexDirection: 'row', marginBottom: 48},
  battery: {
    borderColor: 'rgb(199,199,204)',
    borderWidth: 3,
    borderRadius: borderRadius,
    width: 120,
    height: 55,
    padding: 3,
  },
  batteryCapacity: {
    height: '100%',
    borderRadius: borderRadius / 2,
  },
  mask: {flex: 1, flexDirection: 'row', height: '100%'},
  textContainer: {
    ...StyleSheet.absoluteFill,
  },
  textWrapper: {
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  text: {fontSize: 28, fontWeight: '700', color: '#f2f2f2'},
  capContainer: {
    height: 55,
    width: 30,
    marginLeft: 3,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  batteryCap: {
    width: 22,
    height: 22,
    backgroundColor: 'rgb(199,199,204)',
    borderRadius: 22 / 2,
    position: 'absolute',
    left: -22 / 2,
  },
  dark: {
    height: '100%',
    backgroundColor: 'rgb(44,44,46)',
  },
  light: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgb(242,242,247)',
  },

  slider: (knobWidth, sliderWidth, trailColor) => ({
    height: 7,
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
    borderRadius: knobWidth / 2,
    backgroundColor: knobColor,
    justifyContent: 'center',
    alignItems: 'center',
  }),
  textKnob: textColor => ({color: textColor}),
});
