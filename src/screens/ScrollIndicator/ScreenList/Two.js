import {Text, SafeAreaView} from 'react-native';
import React from 'react';
import dummyText from '../dummyText';
import Animated, {
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

const Two = () => {
  const [contentSize, setContentSize] = React.useState(1);
  const [scrollViewHeight, setScrollViewHeight] = React.useState(0);
  const scrollIndicator = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      scrollIndicator.value = event.contentOffset.y;
    },
  });

  const animatePosition = useAnimatedStyle(() => {
    const movePercent = Math.round(
      scrollIndicator.value / ((contentSize - scrollViewHeight) / 100),
    );

    return {
      width: movePercent < 0 ? 0 : `${movePercent}%`,
    };
  });

  return (
    <SafeAreaView>
      <Animated.View
        style={[{height: 3, backgroundColor: 'green'}, animatePosition]}
      />
      <Animated.ScrollView
        contentContainerStyle={{padding: 12}}
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
        scrollEventThrottle={16}>
        <Text>{dummyText()}</Text>
      </Animated.ScrollView>
    </SafeAreaView>
  );
};

export default Two;
