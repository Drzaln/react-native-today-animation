import React from 'react'
import { StyleSheet } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import SearchInput from './components/SearchInput'

const AnimatedTextInput = () => {
	return (
		<ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps='handled'>
			<SearchInput />
		</ScrollView>
	)
}

export default AnimatedTextInput

const styles = StyleSheet.create({
	container: {
		paddingVertical: 16
	}
})
