import React from 'react';
import {StyleSheet, View, Alert, Dimensions} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useDerivedValue,
  useAnimatedProps,
  runOnJS,
} from 'react-native-reanimated';
import {GestureDetector, Gesture} from 'react-native-gesture-handler';
import {clamp} from '../../../utils';
import AnimateableText from 'react-native-animateable-text';
const {width} = Dimensions.get('window');

const SimpleSlider = ({
  sliderWidth = width * 0.7,
  knobWidth = 35,
  maxRange = 100,
  trailColor = '#ddd',
  activeTrailColor = '#3f51b5',
  knobColor = '#757de8',
  textColor = 'white',
}) => {
  const translateX = useSharedValue(0);
  const isSliding = useSharedValue(false);
  const startValue = useSharedValue(0);

  const onDraggedSuccess = () => {
    Alert.alert('dragged');
  };

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
      if (startValue.value > sliderWidth - knobWidth / 2) {
        runOnJS(onDraggedSuccess)();
      }
    });

  const scrollTranslationStyle = useAnimatedStyle(() => {
    return {transform: [{translateX: translateX.value}]};
  });

  const progressStyle = useAnimatedStyle(() => {
    return {
      width: translateX.value + knobWidth,
    };
  });

  const stepText = useDerivedValue(() => {
    const sliderRange = sliderWidth - knobWidth;
    const oneStepValue = sliderRange / maxRange;
    const step = Math.floor(translateX.value / oneStepValue);

    return String(step);
  });

  const animatedProps = useAnimatedProps(() => {
    return {
      text: stepText.value,
    };
  });

  return (
    <View style={styles.slider(knobWidth, sliderWidth, trailColor)}>
      <Animated.View
        style={[styles.progress(knobWidth, activeTrailColor), progressStyle]}
      />
      <GestureDetector gesture={gesture}>
        <Animated.View
          style={[styles.knob(knobWidth, knobColor), scrollTranslationStyle]}>
          <AnimateableText
            animatedProps={animatedProps}
            style={styles.text(textColor)}
          />
        </Animated.View>
      </GestureDetector>
    </View>
  );
};

export default SimpleSlider;

const styles = StyleSheet.create({
  slider: (knobWidth, sliderWidth, trailColor) => ({
    height: 10,
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
  text: textColor => ({color: textColor}),
});
