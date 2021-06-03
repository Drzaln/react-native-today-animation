import React, { useMemo } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import Animated, {
	interpolateNode,
	multiply,
	set,
	timing,
	useAnimatedStyle,
	useCode,
	useSharedValue,
	withTiming
} from 'react-native-reanimated'
import Svg, { Circle } from 'react-native-svg'
import { clamp, toRad } from '../../../../../utils'
const AnimatedCircle = Animated.createAnimatedComponent(Circle)
const AnimatedSVG = Animated.createAnimatedComponent(Svg)

const CircleAnimate = ({
	percent = 75,
	duration = 1000,
	bgStrokeColor = '#3E4346',
	radius = 40,
	isRadius = false,
	strokeColor = '#FFC93C',
	strokeWidth = 6,
	maxProgress = 100,
	minProgress = 0
}) => {
	const progressAnimated = useSharedValue(0)
	const progressSpin = useSharedValue(0)
	const actualProgress = clamp(progressAnimated.value, minProgress, maxProgress)

	// useCode(() => [ set(progressAnimated.value, timing({ from: progressAnimated.value, to: percent, duration })) ], [
	// 	percent
	// ])

	// React.useEffect(
	// 	() => {
	// 		progressAnimated.value = withTiming(percent)
	// 	},
	// 	[ percent ]
	// )

	const strokeDasharray = useMemo(() => `${radius * 2 * Math.PI} ${radius * 2 * Math.PI}`, [ radius ])
	const alpha = interpolateNode(actualProgress, {
		inputRange: [ minProgress, maxProgress ],
		outputRange: [ Math.PI * 2, 0 ]
	})
	const strokeDashoffset = multiply(alpha, radius)

	// const animatedProps = useAnimatedStyle(() => ({
	// 	transform: [
	// 		{
	// 			rotate: interpolateNode(progressSpin.value, {
	// 				inputRange: [ 0, 1 ],
	// 				outputRange: [ toRad(0), Math.PI * 2 ]
	// 			})
	// 		}
	// 	]
	// }))

	const animate = () => {
		(progressAnimated.value = withTiming(percent, { duration }))
	}

	return (
		<Pressable style={[ styles.container ]} onPress={animate}>
			<AnimatedSVG
				width={radius * 2 + strokeWidth}
				height={radius * 2 + strokeWidth}
				style={{ transform: [ { rotate: `${Math.PI * 1}rad` } ] }}>
				<AnimatedCircle
					r={radius}
					x={radius + strokeWidth / 2}
					y={radius + strokeWidth / 2}
					stroke={bgStrokeColor}
					strokeWidth={strokeWidth}
				/>
				<AnimatedCircle
					strokeLinecap={isRadius ? 'round' : undefined}
					strokeDashoffset={strokeDashoffset}
					strokeDasharray={strokeDasharray}
					r={radius}
					x={radius + strokeWidth / 2}
					y={radius + strokeWidth / 2}
					stroke={strokeColor}
					strokeWidth={strokeWidth}
				/>
			</AnimatedSVG>
		</Pressable>
	)
}

export default CircleAnimate

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		alignItems: 'center',
		transform: [ { rotate: '90deg' } ]
	}
})
