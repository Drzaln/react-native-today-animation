import {View, Text, ImageBackground, Image, Pressable} from 'react-native';
import React from 'react';
import Animated, {
  runOnJS,
  useAnimatedProps,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import Svg, {Circle, G} from 'react-native-svg';
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const IMAGE =
  'https://openclipart.org/image/2400px/svg_to_png/179283/iOS-7-Icon-Template.png';

const size = 72;
const borderRadius = (10 / 57) * size;
const R = 29; // can be customized
const STROKE_WIDTH = 15;
const CIRCLE_LENGTH = Math.PI * R;
const halfCircle = R + STROKE_WIDTH;

const IosIcon = () => {
  const [text, setText] = React.useState('');
  const [display, setDisplay] = React.useState('none');
  const animateSize = useSharedValue(size / 1.5);
  const animateScale = useSharedValue(0);
  const progress = useSharedValue(1);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: CIRCLE_LENGTH * (1 - progress.value),
  }));

  const animatedReveal = useAnimatedStyle(() => {
    return {
      width: animateSize.value,
      height: animateSize.value,
      transform: [{scale: animateScale.value}],
    };
  });

  const onPress = () => {
    setDisplay('flex');
    setText('Waiting...');
    animateScale.value = withDelay(
      700,
      withTiming(1, {duration: 650}, () => {
        runOnJS(setText)('Loading...');
        progress.value = withTiming(0, {duration: 4000}, () => {
          animateSize.value = withTiming(size * 2, {duration: 650}, () => {
            runOnJS(setText)('App Name');
          });
        });
      }),
    );
  };

  useDerivedValue(() => {
    if (progress.value < 0.4) {
      runOnJS(setText)('Installing...');
    }
  });

  return (
    <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
      {display === 'none' && <View style={{height: 95}} />}
      <View style={{alignItems: 'center', display}}>
        <ImageBackground
          style={{
            width: size,
            height: size,
          }}
          imageStyle={{borderRadius, backgroundColor: 'rgb(242, 242, 247)'}}
          resizeMode="cover"
          source={{
            uri: IMAGE,
          }}>
          <View
            style={{
              width: size,
              height: size,
              borderRadius,
              backgroundColor: 'rgba(0,0,0,0.5)',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Animated.View
              style={[
                {
                  borderRadius: size / 1.5,
                  overflow: 'hidden',
                  alignItems: 'center',
                  justifyContent: 'center',
                },
                animatedReveal,
              ]}>
              <Image
                style={{
                  width: size,
                  height: size,
                  borderRadius: borderRadius,
                  backgroundColor: 'rgb(242, 242, 247)',
                }}
                resizeMode="cover"
                source={{
                  uri: IMAGE,
                }}
              />
              <Animated.View
                style={{
                  position: 'absolute',
                  transform: [{rotateY: '180deg'}, {scale: 1}],
                }}>
                <Svg
                  height={R * 2}
                  width={R * 2}
                  viewBox={`0 0 ${halfCircle * 2} ${halfCircle * 2}`}>
                  <G rotation="-90" origin={`${halfCircle}, ${halfCircle}`}>
                    <AnimatedCircle
                      cx="50%"
                      cy="50%"
                      r={R / 2}
                      stroke={'rgba(0,0,0,0.5)'}
                      strokeWidth={R}
                      strokeDasharray={CIRCLE_LENGTH}
                      animatedProps={animatedProps}
                    />
                  </G>
                </Svg>
              </Animated.View>
            </Animated.View>
          </View>
        </ImageBackground>
        <Text style={{fontSize: 12, marginTop: 6}}>{text}</Text>
      </View>
      <Pressable
        style={{
          backgroundColor: 'rgb(0, 122, 255)',
          borderRadius: 10,
          padding: 10,
          marginTop: 10,
        }}
        onPress={onPress}>
        <Text style={{color: 'white'}}>Install</Text>
      </Pressable>
    </View>
  );
};

export default IosIcon;
