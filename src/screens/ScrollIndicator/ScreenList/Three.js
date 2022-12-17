import {Text, SafeAreaView, View, Pressable, StyleSheet} from 'react-native';
import React, {useRef} from 'react';
import dummyText from '../dummyText';
import Animated, {
  useAnimatedProps,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import AnimateableText from 'react-native-animateable-text';
import Icon from 'react-native-vector-icons/Feather';

const AnimateIcon = Animated.createAnimatedComponent(Icon);

const Three = () => {
  const [contentSize, setContentSize] = React.useState(1);
  const [scrollViewHeight, setScrollViewHeight] = React.useState(0);
  const scrollRef = useRef(null);
  const scrollIndicator = useSharedValue(0);
  const isScrolled = useSharedValue(false);
  const isMomentum = useSharedValue(false);

  const scrollPercent = useDerivedValue(() => {
    const movePercent = Math.round(
      scrollIndicator.value / ((contentSize - scrollViewHeight) / 100),
    );

    return movePercent;
  });

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      scrollIndicator.value = event.contentOffset.y;
    },
  });

  const animatedProgress = useAnimatedStyle(() => {
    return {
      width:
        scrollPercent.value < 0
          ? 0
          : scrollPercent.value > 100
          ? '100%'
          : `${scrollPercent.value}%`,
    };
  });

  const animateWidth = useAnimatedStyle(() => {
    return {
      width: withTiming(isScrolled.value ? 160 : 48),
    };
  });

  const animatedProgressContainer = useAnimatedStyle(() => {
    return {
      width: withTiming(isScrolled.value ? 80 : 0),
      marginLeft: withTiming(!isScrolled.value ? 0 : 8),
    };
  });

  const animateIconStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(isScrolled.value ? 0 : 1),
    };
  });

  const animatePercentStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(isScrolled.value ? 1 : 0),
    };
  });

  const animatedProps = useAnimatedProps(() => {
    return {
      text:
        scrollPercent.value < 0
          ? '0%'
          : scrollPercent.value > 100
          ? '100%'
          : `${scrollPercent.value}%`,
    };
  });

  const checkIfScrolled = () => {
    'worklet';
    if (isScrolled.value || !isMomentum.value) {
      setTimeout(() => {
        isScrolled.value = false;
      }, 2000);
    }
  };

  return (
    <SafeAreaView>
      <Animated.ScrollView
        ref={scrollRef}
        contentContainerStyle={{padding: 16}}
        showsVerticalScrollIndicator={false}
        onContentSizeChange={(_, height) => {
          setContentSize(height);
        }}
        onLayout={({
          nativeEvent: {
            layout: {height},
          },
        }) => {
          setScrollViewHeight(height);
        }}
        onScroll={scrollHandler}
        onScrollBeginDrag={() => {
          isScrolled.value = true;
        }}
        onScrollEndDrag={() => checkIfScrolled()}
        onMomentumScrollBegin={() => (isMomentum.value = true)}
        onMomentumScrollEnd={() => {
          isMomentum.value = false;
          isScrolled.value = false;
        }}
        scrollEventThrottle={16}>
        <Text>{dummyText()}</Text>
      </Animated.ScrollView>

      <View style={{position: 'absolute', bottom: 50, right: 40}}>
        <Pressable
          style={{
            ...StyleSheet.absoluteFillObject,
            zIndex: 1,
          }}
          onPress={() => {
            scrollRef.current.scrollTo({x: 0, y: 0, animated: true});
          }}
        />
        <Animated.View
          style={[
            {
              height: 48,
              borderRadius: 48 / 2,
              backgroundColor: 'dimgray',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
            },
            animateWidth,
          ]}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              width: 32,
            }}>
            <AnimateIcon
              name="arrow-up"
              size={27}
              color="white"
              style={animateIconStyle}
            />
            <AnimateableText
              animatedProps={animatedProps}
              style={[
                {position: 'absolute', color: 'white', fontSize: 12},
                animatePercentStyle,
              ]}
            />
          </View>
          <Animated.View
            style={[
              {
                height: 3,
                backgroundColor: 'rgba(255,255,255,0.3)',
                borderRadius: 100,
              },
              animatedProgressContainer,
            ]}>
            <Animated.View
              style={[
                {
                  height: 3,
                  backgroundColor: 'rgba(255,255,255,0.8)',
                  borderRadius: 100,
                },
                animatedProgress,
              ]}
            />
          </Animated.View>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

export default Three;
