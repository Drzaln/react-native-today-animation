import React from 'react';
import {
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const {width} = Dimensions.get('window');

const ExpandedSearch = () => {
  const [textInput, setTextInput] = React.useState('');
  const inputRef = React.useRef();
  const isActive = useSharedValue(false);
  const isExpanded = useSharedValue(false);
  const size = width * 0.1;
  const expandSize = width * 0.9;

  const textFocusState = state => {
    if (state) {
      inputRef.current.focus();
    } else {
      inputRef.current.blur();
    }
  };

  const textAnimateStyle = useAnimatedStyle(() => {
    return {
      opacity: isActive.value
        ? withTiming(0, {}, isFinished => {
            if (isFinished) {
              isExpanded.value = true;
              runOnJS(textFocusState)(true);
            }
          })
        : withTiming(1, {}, isFinished => {
            if (isFinished) {
              runOnJS(textFocusState)(false);
              isExpanded.value = false;
            }
          }),
    };
  });

  const expandSearchAnimate = useAnimatedStyle(() => {
    return {
      width: isExpanded.value ? withTiming(expandSize) : withTiming(size),
    };
  });

  const opacityInsideSearch = useAnimatedStyle(() => {
    return {
      opacity: isExpanded.value ? withTiming(1) : withTiming(0),
    };
  });

  return (
    <View style={styles.container}>
      <View>
        <Animated.View style={[styles.roundIcon(size), expandSearchAnimate]}>
          <View style={styles.flex08}>
            <TextInput
              ref={inputRef}
              style={styles.textInput}
              onChangeText={setTextInput}
              value={textInput}
            />
          </View>
          <Animated.View style={[styles.textContainer, opacityInsideSearch]}>
            {textInput.length > 0 ? (
              <Pressable
                onPress={() => {
                  setTextInput('');
                  inputRef.current.clear();
                }}>
                <Text style={styles.marginB4}>delete</Text>
              </Pressable>
            ) : (
              <Pressable onPress={() => (isActive.value = false)}>
                <Text style={styles.marginB4}>close</Text>
              </Pressable>
            )}
          </Animated.View>
        </Animated.View>
        <View style={styles.bottomIcon} />
      </View>
      <Pressable onPress={() => (isActive.value = true)}>
        <Animated.Text style={[styles.marginL20, textAnimateStyle]}>
          Press me to search
        </Animated.Text>
      </Pressable>
    </View>
  );
};

export default ExpandedSearch;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  roundIcon: size => ({
    height: size,
    borderRadius: size / 2,
    borderColor: 'black',
    borderWidth: 1,
    flexDirection: 'row',
    overflow: 'hidden',
  }),
  flex08: {flex: 0.8},
  textInput: {height: 38, width: '100%', paddingLeft: 16},
  textContainer: {
    flex: 0.2,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
  },
  marginB4: {marginBottom: 4},
  bottomIcon: {
    height: 10,
    width: 2,
    backgroundColor: 'black',
    transform: [{rotate: '-45deg'}],
    position: 'absolute',
    bottom: -2,
    right: 2,
  },
  marginL20: {marginLeft: 20},
});
