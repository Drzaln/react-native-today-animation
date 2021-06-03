import React from 'react'
import { Pressable, StyleSheet, Text } from 'react-native'
import Animated, {
	interpolateColor,
	runOnJS,
	useAnimatedStyle,
	useSharedValue,
	withDelay,
	withTiming
} from 'react-native-reanimated'
import Svg, { Path } from 'react-native-svg'

const AnimatedPath = Animated.createAnimatedComponent(Path)

const Check1 = ({ textContent, color = '#2a9d8f', size = 20, iconColor = '#fff' }) => {
	const [ checkState, setCheckState ] = React.useState(false)
	const animateDash = useSharedValue(0)

	const animate = () => {
		animateDash.value = !animateDash.value
	}

	const animatedProps = useAnimatedStyle(() => ({
		strokeDashoffset: animateDash.value
			? withDelay(
					400,
					withTiming(0, { duration: 500 }, (finished) => {
						if (finished) {
							runOnJS(setCheckState)(true)
						}
					})
				)
			: withTiming(40, { duration: 500 }, (finished) => {
					if (finished) {
						runOnJS(setCheckState)(false)
					}
				})
	}))

	const animateBg = useAnimatedStyle(() => ({
		transform: [ { scale: animateDash.value ? withTiming(1) : withDelay(550, withTiming(0)) } ],
		backgroundColor: color
	}))

	const animateContainer = useAnimatedStyle(() => ({
		borderColor: interpolateColor(animateDash.value, [ 0, 1 ], [ '#8d99ae', color ])
	}))

	return (
		<Pressable style={styles.container} onPress={animate}>
			<Animated.View style={[ styles.checkContainer, animateContainer ]}>
				<Animated.View style={[ styles.bg(size), animateBg ]} />
				<Svg xmlns='http://www.w3.org/2000/svg' width={size} height={size} viewBox={`0 0 24 24`}>
					<AnimatedPath
						d='M20 6L9 17l-5-5'
						width={size}
						height={size}
						viewBox={`0 0 24 24`}
						fill='none'
						stroke={iconColor}
						strokeWidth={2}
						strokeLinecap='round'
						strokeLinejoin='round'
						strokeDasharray={40}
						animatedProps={animatedProps}
					/>
				</Svg>
			</Animated.View>
			<Text style={styles.text(checkState)}>{textContent}</Text>
		</Pressable>
	)
}

export default Check1

const styles = StyleSheet.create({
	container: { flexDirection: 'row', alignItems: 'center' },
	checkContainer: {
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 4,
		borderWidth: 1,
		overflow: 'hidden'
	},
	text: (status) => ({
		marginLeft: 8,
		textDecorationLine: status ? 'line-through' : 'none',
		color: status ? '#8d99ae' : '#000'
	}),
	bg: (size) => ({
		position: 'absolute',
		borderRadius: 4,
		height: size + 1,
		width: size + 1
	})
})
