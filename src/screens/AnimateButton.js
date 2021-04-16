import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import Animated, { Easing, useAnimatedStyle, useSharedValue, withDelay, withTiming } from 'react-native-reanimated'
import Icon from 'react-native-vector-icons/Feather'

const AnimateButton = () => {
	const width = useSharedValue(0)
	const success = useSharedValue(false)
	const animateWidth = useAnimatedStyle(() => {
		return {
			width:
				width.value === 1
					? withTiming('100%', { easing: Easing.cubic, duration: 1200 }, (finished) => {
							if (finished) {
								success.value = true
							}
						})
					: '0%'
		}
	})
	const animateText = useAnimatedStyle(() => {
		return {
			opacity: width.value > 0.5 ? withTiming(0, { duration: 700 }) : withTiming(1)
		}
	})
	const iconY = useAnimatedStyle(() => {
		return {
			transform: [
				{
					translateY:
						width.value > 0.5 ? withTiming(100, { duration: 800, easing: Easing.circle }) : withTiming(0)
				}
			],
			opacity: width.value > 0.5 ? withTiming(0, { duration: 700 }) : withTiming(1)
		}
	})
	const successY = useAnimatedStyle(() => {
		return {
			transform: [
				{
					translateY: success.value
						? withTiming(0, { duration: 1000 }, (finished) => {
								if (finished) {
									width.value = withDelay(800, withTiming(0))
									success.value = withDelay(800, withTiming(false))
								}
							})
						: withTiming(100)
				}
			]
		}
	})
	return (
		<View style={styles.container}>
			<Pressable style={styles.button} onPress={() => (width.value = 1)}>
				<Animated.View style={[ styles.overlay, animateWidth ]} />
				<Animated.View style={[ styles.success, successY ]}>
					<Icon name='check' size={24} color='#fff' />
					<Text style={styles.successText}>Success</Text>
				</Animated.View>
				<View style={styles.downloadContainer}>
					<Animated.View style={iconY}>
						<Icon name='download' size={18} color='#000' />
					</Animated.View>
					<Animated.Text style={[ styles.text, animateText ]}>Download</Animated.Text>
				</View>
			</Pressable>
		</View>
	)
}

export default AnimateButton

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	overlay: {
		position: 'absolute',
		top: 0,
		backgroundColor: '#2ec4b6',
		height: '100%'
	},
	success: {
		position: 'absolute',
		width: '100%',
		height: '100%',
		backgroundColor: 'transparent',
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'row'
	},
	button: {
		width: '70%',
		height: 45,
		borderRadius: 8,
		backgroundColor: '#ffffff',
		justifyContent: 'center',
		overflow: 'hidden'
	},
	text: {
		textAlign: 'center',
		color: 'black',
		marginLeft: 8
	},
	downloadContainer: { justifyContent: 'center', alignItems: 'center', flexDirection: 'row' },
	successText: { color: 'white', marginLeft: 8 }
})
