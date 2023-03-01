import {Button, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const Stepper = () => {
  const [indexActive, setIndexActive] = React.useState(0);

  const content = [
    <MyComponent text={1} />,
    <MyComponent text={2} />,
    <MyComponent text={3} />,
    <MyComponent text={4} />,
  ];

  const next = () => {
    if (indexActive < content.length - 1) {
      setIndexActive(o => o + 1);
    }
  };

  const prev = () => {
    if (indexActive > 0) {
      setIndexActive(o => o - 1);
    }
  };

  return (
    <View style={styles.container}>
      <StepperComponent active={indexActive} content={content} />
      <View style={[styles.row, styles.jBetween]}>
        <Button onPress={prev} title="Previous" color="black" />
        <Button
          onPress={next}
          title={indexActive === content.length - 1 ? 'Finish' : 'Next'}
          color="green"
        />
      </View>
    </View>
  );
};

export default Stepper;

const MyComponent = ({text}) => {
  return (
    <ScrollView style={{height: 200}}>
      <View
        style={{
          height: 200,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text>{text}</Text>
      </View>
    </ScrollView>
  );
};

const StepperComponent = ({content, active}) => {
  return (
    <View>
      <View style={styles.row}>
        {content && content.length > 1 ? (
          <>
            {content.map((_, i) => (
              <>
                {i === 0 ? (
                  <View key={i} style={[styles.circle, styles.firstCircle]} />
                ) : (
                  <StepperItem key={i} active={active >= i} />
                )}
              </>
            ))}
          </>
        ) : null}
      </View>
      <ScrollView
        key={active}
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}>
        {content[active]}
      </ScrollView>
    </View>
  );
};

const StepperItem = ({active}) => {
  const animateLine = useSharedValue(0);
  const animateCircle = useSharedValue(-30);

  const animatedLineStyle = useAnimatedStyle(() => {
    return {
      width: `${animateLine.value * 100}%`,
    };
  });
  const animatedCircleStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: animateCircle.value}],
    };
  });

  React.useEffect(() => {
    if (active) {
      animateLine.value = withTiming(1, {duration: 300}, finished =>
        finished
          ? ((animateCircle.value = withTiming(0)), {duration: 300})
          : null,
      );
    } else {
      animateCircle.value = withTiming(-30, {duration: 300}, finished =>
        finished
          ? ((animateLine.value = withTiming(0)), {duration: 300})
          : null,
      );
    }
  }, [active]);

  return (
    <>
      <View style={styles.line}>
        <Animated.View style={[styles.maskLine, animatedLineStyle]} />
      </View>
      <View style={[styles.circle, styles.backCircle]}>
        <Animated.View
          style={[styles.circle, styles.maskCircle, animatedCircleStyle]}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  jBetween: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
  },
  firstCircle: {
    backgroundColor: '#ef233c',
  },
  backCircle: {
    backgroundColor: '#ef233c' + '50',
    overflow: 'hidden',
  },
  maskCircle: {
    backgroundColor: '#ef233c',
    borderRadius: 0,
  },
  line: {
    backgroundColor: '#ef233c' + '50',
    height: 3,
    flex: 1,
  },
  maskLine: {
    backgroundColor: '#ef233c',
    height: 3,
  },
});
