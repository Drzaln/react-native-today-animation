import {Text, SafeAreaView, View} from 'react-native';
import React from 'react';
import dummyText from '../dummyText';
import Animated, {
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

const One = () => {
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
      <View style={{flexDirection: 'row', paddingHorizontal: 4}}>
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
        <View
          style={{
            height: indicatorContainerHeight,
            width: 6,
            backgroundColor: 'rgba(0,0,0,0.1)',
            borderRadius: 8,
            marginTop: 16,
          }}>
          <Animated.View
            style={[
              {
                width: 6,
                borderRadius: 8,
                backgroundColor: 'rgba(0,0,0,0.5)',
                height: indicatorHeight,
              },
              animatePosition,
            ]}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default One;
