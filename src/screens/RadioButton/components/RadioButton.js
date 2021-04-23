import React from 'react'
import { Pressable, StyleSheet, Text } from 'react-native'
import Animated, {
	interpolateColor,
	useAnimatedStyle,
	useSharedValue,
	withDelay,
	withTiming
} from 'react-native-reanimated'

const RadioButton = ({ title, color = '#8ecae6' }) => {
	const radioState = useSharedValue(0)

	const animatedContainer = useAnimatedStyle(() => {
		return {
			borderWidth: radioState.value ? withTiming(15) : withDelay(410, withTiming(2)),
			borderColor: interpolateColor(radioState.value, [ 0, 1 ], [ '#ced4da', color ])
		}
	})
	const firstAnimate = useAnimatedStyle(() => {
		return {
			transform: [
				{ translateY: radioState.value ? withDelay(400, withTiming(0)) : withDelay(300, withTiming(-30)) }
			]
		}
	})
	const secondAnimate = useAnimatedStyle(() => {
		return {
			transform: [
				{ translateY: radioState.value ? withDelay(450, withTiming(0)) : withDelay(350, withTiming(-30)) }
			]
		}
	})
	const thirdAnimate = useAnimatedStyle(() => {
		return {
			transform: [
				{ translateY: radioState.value ? withDelay(485, withTiming(0)) : withDelay(385, withTiming(-30)) }
			]
		}
	})

	const radioHandler = () => {
		radioState.value = !radioState.value
	}
	return (
		<Pressable style={styles.pressable} onPress={radioHandler}>
			<Animated.View style={[ styles.container, animatedContainer ]}>
				<Animated.View style={[ styles.firstCircle, firstAnimate ]} />
				<Animated.View style={[ styles.secondCircle, secondAnimate ]} />
				<Animated.View style={[ styles.thirdCircle, thirdAnimate ]} />
			</Animated.View>
			{title ? <Text style={styles.titleText}>{title}</Text> : null}
		</Pressable>
	)
}

export default RadioButton

const styles = StyleSheet.create({
	pressable: {
		flexDirection: 'row',
		alignItems: 'center',
		overflow: 'hidden'
	},
	titleText: {
		marginLeft: 8,
		fontSize: 14
	},
	container: {
		height: 30,
		width: 30,
		borderRadius: 100,
		alignItems: 'center',
		justifyContent: 'center'
	},
	firstCircle: {
		backgroundColor: 'white',
		height: 18,
		width: 18,
		borderRadius: 100
	},
	secondCircle: {
		backgroundColor: 'white',
		height: 14,
		width: 14,
		borderRadius: 100,
		position: 'absolute'
	},
	thirdCircle: {
		backgroundColor: 'white',
		height: 8,
		width: 8,
		borderRadius: 100,
		position: 'absolute'
	}
})
