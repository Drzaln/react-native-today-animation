import {View, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import Animated, {
  Easing,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
const SIZE = 100;
const DURATION = 1000;

const AnalogClockLoading = () => {
  const hourAnimate = useSharedValue(0);
  const minuteAnimate = useSharedValue(0);
  const oldMinute = useSharedValue(0);
  const newMinute = useSharedValue(0);

  useEffect(() => {
    hourAnimate.value = withRepeat(
      withTiming(360, {duration: DURATION, easing: Easing.linear}),
      -1,
    );
  }, [hourAnimate]);

  const minute = useDerivedValue(() => {
    let newValue = newMinute.value;
    if (Math.floor(hourAnimate.value) >= 360) {
      oldMinute.value = minuteAnimate.value;
      newMinute.value = oldMinute.value + 30;
      newValue = newMinute.value;
    } else {
      minuteAnimate.value = newMinute.value;
    }
    return withTiming(newValue, {duration: DURATION, easing: Easing.linear});
  });

  const minuteAnimated = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: `${minute.value}deg`,
        },
      ],
    };
  });

  const hourAnimated = useAnimatedStyle(() => {
    return {
      transform: [{rotate: `${hourAnimate.value}deg`}],
    };
  });

  return (
    <View style={styles.container}>
      <View style={styles.clockCircle}>
        <Animated.View style={[styles.mover, hourAnimated]}>
          <View style={styles.hourHand} />
        </Animated.View>
        <Animated.View style={[styles.mover, minuteAnimated]}>
          <View style={styles.minuteHand} />
        </Animated.View>
        <View style={styles.smallCircle} />
      </View>
    </View>
  );
};

export default AnalogClockLoading;

const styles = StyleSheet.create({
  container: {alignItems: 'center', justifyContent: 'center', flex: 1},
  clockCircle: {
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
    borderWidth: SIZE * 0.04,
    borderColor: '#1e1e1e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mover: {
    position: 'absolute',
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  hourHand: {
    width: SIZE * 0.04,
    height: '40%',
    marginTop: '10%',
    backgroundColor: '#1e1e1e',
    borderRadius: (SIZE * 0.04) / 2,
  },
  minuteHand: {
    width: SIZE * 0.04,
    height: '30%',
    marginTop: '20%',
    backgroundColor: '#1e1e1e',
    borderRadius: (SIZE * 0.04) / 2,
  },
  smallCircle: {
    width: SIZE * 0.05,
    height: SIZE * 0.05,
    borderRadius: SIZE * 0.05,
    backgroundColor: '#1e1e1e',
    position: 'absolute',
  },
});
