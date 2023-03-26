import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
  useAnimatedGestureHandler,
  withSpring,
  interpolate,
  withDecay,
} from 'react-native-reanimated';
import {PanGestureHandler} from 'react-native-gesture-handler';
import {useHeaderHeight} from '@react-navigation/elements';

const {width, height} = Dimensions.get('window');
const BALL_SIZE = 100;

export default function Collision() {
  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  function generateSize() {
    return Math.floor(Math.random() * 51) + 25;
  }

  const circles = [
    {
      x: useSharedValue(0),
      y: useSharedValue(0),
      radius: generateSize(),
      id: 1,
      color: getRandomColor(),
    },
    {
      x: useSharedValue(20),
      y: useSharedValue(20),
      radius: generateSize(),
      id: 2,
      color: getRandomColor(),
    },
    {
      x: useSharedValue(30),
      y: useSharedValue(30),
      radius: generateSize(),
      id: 3,
      color: getRandomColor(),
    },
    {
      x: useSharedValue(30),
      y: useSharedValue(30),
      radius: generateSize(),
      id: 4,
      color: getRandomColor(),
    },
  ];

  return (
    <View style={styles.container}>
      {circles.map(circle => (
        <CollisionComponent key={circle.id} circle={circle} circles={circles} />
      ))}
    </View>
  );
}

function CollisionComponent({circle, circles}) {
  const headerHeight = useHeaderHeight();

  const boundX = width - circle.radius * 2;
  const boundY = height - headerHeight * 3 - circle.radius * 2;

  const onGestureEvent = useAnimatedGestureHandler({
    onStart: (_event, context) => {
      context.offsetX = circle.x.value;
      context.offsetY = circle.y.value;
    },
    onActive: (event, context) => {
      circle.x.value = context.offsetX + event.translationX;
      circle.y.value = context.offsetY + event.translationY;
    },
    onEnd: event => {
      // this will limit drag to not offset screen size
      circle.x.value = withDecay({
        clamp: [0, boundX],
        velocity: event.velocityX,
      });
      circle.y.value = withDecay({
        clamp: [0, boundY],
        velocity: event.velocityY,
      });
    },
  });

  const getCircleStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: circle.x.value}, {translateY: circle.y.value}],
    };
  });

  const isColliding = useDerivedValue(() => {
    for (let i = 0; i < circles.length; i++) {
      for (let j = i + 1; j < circles.length; j++) {
        const circleA = circles[i];
        const circleB = circles[j];

        const dx = circleB.x.value - circleA.x.value;
        const dy = circleB.y.value - circleA.y.value;
        const distanceBetweenCenters = Math.hypot(dx, dy);
        const isOverlapping = distanceBetweenCenters < circle.radius * 2;

        return isOverlapping;

        // if (areOverlapping) {
        //   const overlapDistance = circle.radius * 2 - distanceBetweenCenters;
        //   const percentOverlap = (overlapDistance / circle.radius) * 2;

        //   const halfPercent = percentOverlap * 0.5;

        //   circleA.x -= dx * halfPercent;
        //   circleA.y -= dy * halfPercent;

        //   circleB.x += dx * halfPercent;
        //   circleB.y += dy * halfPercent;
        // }
      }
    }
  });

  const collisionAnimation = useAnimatedStyle(() => {
    const scale = withTiming(isColliding.value ? 1.5 : 1, {duration: 100});

    const bounceScale = withSpring(isColliding.value ? 1.2 : 1);

    return {
      backgroundColor: isColliding.value ? 'red' : circle.color,
    };
  });

  return (
    <PanGestureHandler onGestureEvent={onGestureEvent}>
      <Animated.View
        style={[
          styles.circle(circle.color, circle.radius * 2),
          getCircleStyle,
          collisionAnimation,
        ]}
      />
    </PanGestureHandler>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  circle: (color, size) => ({
    width: size,
    height: size,
    borderRadius: size / 2,
    backgroundColor: color,
    position: 'absolute',
  }),
  circle2: {
    backgroundColor: 'red',
  },
});
