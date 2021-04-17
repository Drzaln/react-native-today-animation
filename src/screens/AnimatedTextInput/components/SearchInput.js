import React from 'react'
import { Pressable, StyleSheet, TextInput, View } from 'react-native'
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import Icon from 'react-native-vector-icons/Feather'

const SearchInput = () => {
	const [ textInput, setTextInput ] = React.useState('')
	const inputRef = React.useRef()
	const inputFill = useSharedValue(false)

	React.useEffect(
		() => {
			if (textInput) {
				inputFill.value = true
			} else {
				inputFill.value = false
			}
		},
		[ textInput ]
	)

	const inputWidth = useAnimatedStyle(() => {
		return {
			width: inputFill.value
				? withTiming('90%', { easing: Easing.linear })
				: withTiming('100%', { easing: Easing.linear })
		}
	})

	const deletePosition = useAnimatedStyle(() => {
		return {
			right: inputFill.value
				? withTiming(16, { easing: Easing.linear })
				: withTiming(-100, { easing: Easing.linear })
		}
	})

	const deleteInput = () => {
		setTextInput('')
		inputRef.current.clear()
		inputFill.value = false
	}

	return (
		<View style={styles.container}>
			<Animated.View style={[ styles.textInputContainer, inputWidth ]}>
				<View style={styles.searchIcon}>
					<Icon name='search' size={24} color='#6c757d' />
				</View>
				<TextInput
					ref={inputRef}
					style={styles.textInput}
					onChangeText={setTextInput}
					value={textInput}
					placeholder='lovely placeholder'
					keyboardType='default'
				/>
			</Animated.View>
			<Animated.View style={[ styles.deleteIcon, deletePosition ]}>
				<Pressable onPress={deleteInput}>
					<Icon name='x' size={20} color='#3d405b' />
				</Pressable>
			</Animated.View>
		</View>
	)
}

export default SearchInput

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		paddingHorizontal: 16,
		alignItems: 'center'
	},
	textInputContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		borderRadius: 8,
		borderColor: '#6d6875',
		borderWidth: 1,
		paddingHorizontal: 8,
		backgroundColor: 'white'
	},
	searchIcon: {
		marginRight: 8
	},
	textInput: {
		height: 40,
		width: '90%'
	},
	deleteIcon: {
		position: 'absolute',
		padding: 4,
		backgroundColor: 'white',
		borderRadius: 100,
		borderColor: '#6d6875',
		borderWidth: 1
	}
})
