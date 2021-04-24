import React from 'react'
import { Pressable, StyleSheet, Text } from 'react-native'
import Animated, {
	interpolateColor,
	useAnimatedStyle,
	useSharedValue,
	withDelay,
	withTiming
} from 'react-native-reanimated'

const LiquidSwitch = ({ title, activeColor = '#00bbf9', inactiveColor = '#adb5bd' }) => {
	const switchState = useSharedValue(0)

	const animatedContainer = useAnimatedStyle(() => {
		return {
			backgroundColor: interpolateColor(switchState.value, [ 0, 1 ], [ inactiveColor, activeColor ])
		}
	})
	const firstAnimate = useAnimatedStyle(() => {
		return {
			transform: [
				{ translateX: switchState.value ? withDelay(0, withTiming(25)) : withDelay(0, withTiming(0)) }
			]
		}
	})
	const secondAnimate = useAnimatedStyle(() => {
		return {
			transform: [
				{ translateX: switchState.value ? withDelay(90, withTiming(33)) : withDelay(90, withTiming(8)) }
			]
		}
	})
	const thirdAnimate = useAnimatedStyle(() => {
		return {
			transform: [
				{ translateX: switchState.value ? withDelay(145, withTiming(36)) : withDelay(145, withTiming(11)) }
			]
		}
	})

	const switchHandler = () => {
		switchState.value = !switchState.value
	}

	return (
		<Pressable style={styles.pressable} onPress={switchHandler}>
			<Animated.View style={[ styles.container, animatedContainer ]}>
				<Animated.View style={[ styles.secondLiquid, thirdAnimate ]} />
				<Animated.View style={[ styles.firstLiquid, secondAnimate ]} />
				<Animated.View style={[ styles.indicator, firstAnimate ]} />
			</Animated.View>
			{title ? <Text style={styles.titleText}>{title}</Text> : null}
		</Pressable>
	)
}

export default LiquidSwitch

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
		width: 56,
		borderRadius: 100,
		padding: 5,
		flexDirection: 'row',
		alignItems: 'center'
	},
	indicator: {
		width: '44%',
		height: '100%',
		borderRadius: 100,
		backgroundColor: '#ffffff'
		// transform: [ { translateX: 25 } ]
	},
	firstLiquid: {
		width: 14,
		height: 14,
		borderRadius: 100,
		backgroundColor: '#ffffff',
		position: 'absolute'
		// transform: [ { translateX: 33 } ]
		// transform: [ { translateX: 8 } ]
	},
	secondLiquid: {
		width: 8,
		height: 8,
		borderRadius: 100,
		backgroundColor: '#ffffff',
		position: 'absolute'
		// transform: [ { translateX: 36 } ]
		// transform: [ { translateX: 11 } ]
	}
})
