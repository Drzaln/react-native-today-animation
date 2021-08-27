import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {PanGestureHandler} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {clamp} from '../../../utils';
const {width} = Dimensions.get('window');

const SlidetoCompare = ({firstImage, secondImage}) => {
  const translateX = useSharedValue(0);
  const leftFlex = useSharedValue(1);
  const rightFlex = useSharedValue(1);

  const onGestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startX = translateX.value;
      ctx.leftImageStart = leftFlex.value;
      ctx.rightImageStart = rightFlex.value;
    },
    onActive: (evt, ctx) => {
      translateX.value = ctx.startX + evt.translationX;
      if (evt.translationX < 0) {
        rightFlex.value =
          ctx.rightImageStart -
          (evt.translationX / ((width * 0.9) / 2 + 5)) * 10;
      } else if (evt.translationX > 0) {
        leftFlex.value =
          ctx.leftImageStart +
          (evt.translationX / ((width * 0.9) / 2 + 5)) * 10;
      }
    },
    onEnd: () => {
      translateX.value = withTiming(0);
      rightFlex.value = withTiming(1);
      leftFlex.value = withTiming(1);
    },
  });

  const cirlceTranslateX = useAnimatedStyle(() => {
    return {
      transform: [{translateX: translateX.value}],
    };
  });

  const imageLeftTranslateX = useAnimatedStyle(() => {
    return {
      flex: leftFlex.value,
    };
  });

  const imageRightTranslateX = useAnimatedStyle(() => {
    return {
      flex: rightFlex.value,
    };
  });

  return (
    <View
      style={{
        width: width * 0.9,
        height: width * 0.9,
        borderRadius: 30,
        overflow: 'hidden',
        flexDirection: 'row',
        justifyContent: 'center',
      }}>
      <Animated.Image
        source={{
          uri: firstImage,
        }}
        style={imageLeftTranslateX}
      />
      <View
        style={{
          width: 5,
          height: '100%',
          backgroundColor: 'transparent',
          alignItems: 'center',
          justifyContent: 'center',
        }}></View>
      <Animated.Image
        source={{
          uri: secondImage,
        }}
        style={imageRightTranslateX}
      />
      <PanGestureHandler
        activeOffsetX={[-0, 0]}
        onGestureEvent={onGestureHandler}>
        <Animated.View style={[styles.circle, cirlceTranslateX]} />
      </PanGestureHandler>
    </View>
  );
};

export default SlidetoCompare;

const styles = StyleSheet.create({
  circle: {
    height: 50,
    width: 50,
    borderRadius: 50 / 2,
    backgroundColor: 'white',
    position: 'absolute',
    zIndex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
  },
});
