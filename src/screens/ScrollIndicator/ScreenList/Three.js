import {Text, SafeAreaView, View} from 'react-native';
import React from 'react';
import dummyText from '../dummyText';
import Animated, {
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

const Three = () => {
  const [contentSize, setContentSize] = React.useState(1);
  const [scrollViewHeight, setScrollViewHeight] = React.useState(0);
  const scrollIndicator = useSharedValue(0);

  const indicatorHeight = 15;
  const indicatorContainerHeight = 100;

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      scrollIndicator.value = event.contentOffset.y;
    },
  });

  const animatePosition = useAnimatedStyle(() => {
    const movePercent = Math.round(
      scrollIndicator.value / ((contentSize - scrollViewHeight) / 100),
    );

    const position =
      ((scrollViewHeight -
        indicatorHeight -
        (scrollViewHeight - indicatorContainerHeight)) /
        100) *
      movePercent;

    return {
      transform: [
        {
          translateY: position,
        },
      ],
    };
  });

  return (
    <SafeAreaView>
      <Animated.ScrollView
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
        onScrollBeginDrag={() => console.log('begin drag')}
        onScrollEndDrag={() => console.log('end drag')}
        onMomentumScrollEnd={() => console.log('momentum end')}
        scrollEventThrottle={16}>
        <Text>{dummyText()}</Text>
      </Animated.ScrollView>
      <View
        style={{
          position: 'absolute',
          bottom: 50,
          right: 40,
          width: 40,
          height: 40,
          borderRadius: 40 / 2,
          backgroundColor: 'green',
        }}
      />
    </SafeAreaView>
  );
};

export default Three;
