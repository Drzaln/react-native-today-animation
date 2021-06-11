import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {PanGestureHandler} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

const {width, height} = Dimensions.get('window');

const GojekBottomNav = () => {
  const startingHeight = 60;
  const startingWidth = width / 1.3;
  const starBot = 70;
  const startBor = 100;
  const heightCon = useSharedValue(startingHeight);
  const widthCon = useSharedValue(startingWidth);
  const botVal = useSharedValue(starBot);
  const borVal = useSharedValue(startBor);
  const borZeroVal = useSharedValue(startBor);
  const maxHeight = Math.floor(height - 70);

  const clamp = (value, lowerBound, upperBound) => {
    'worklet';
    return Math.min(Math.max(lowerBound, value), upperBound);
  };

  const eventHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.height = heightCon.value;
      ctx.width = widthCon.value;
      ctx.bottom = botVal.value;
      ctx.border = borVal.value;
      ctx.borZero = borZeroVal.value;
    },
    onActive: (event, ctx) => {
      heightCon.value = clamp(
        ctx.height + -event.translationY,
        startingHeight,
        maxHeight,
      );
      widthCon.value = clamp(
        ctx.width - event.translationY,
        startingWidth,
        width,
      );
      //   botVal.value = withTiming(0);
      //   borVal.value = withTiming(30);
      //   borZeroVal.value = withTiming(0);
      botVal.value = clamp(ctx.bottom + event.translationY, 0, starBot);
      borVal.value = clamp(ctx.border + event.translationY, 30, startBor);
      borZeroVal.value = clamp(ctx.borZero + event.translationY, 0, startBor);
    },
  });

  const animStyle = useAnimatedStyle(() => {
    return {
      height: heightCon.value,
      width: widthCon.value,
      borderTopLeftRadius: borVal.value,
      borderTopRightRadius: borVal.value,
      borderBottomLeftRadius: borZeroVal.value,
      borderBottomRightRadius: borZeroVal.value,
      bottom: botVal.value,
    };
  });
  return (
    <Animated.View
      style={[
        {
          position: 'absolute',
          backgroundColor: 'white',
          alignSelf: 'center',
          alignItems: 'center',
          elevation: 4,
        },
        animStyle,
      ]}>
      <PanGestureHandler onGestureEvent={eventHandler}>
        <Animated.View
          style={{
            height: 20,
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              height: 5,
              backgroundColor: 'lightgrey',
              borderRadius: 100,
              width: 30,
            }}
          />
        </Animated.View>
      </PanGestureHandler>
      <Text>This is Navigation</Text>
    </Animated.View>
  );
};

export default GojekBottomNav;

const styles = StyleSheet.create({});
