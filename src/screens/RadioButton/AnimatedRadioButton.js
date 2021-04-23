import React from 'react'
import { StyleSheet, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import RadioButton from './components/RadioButton'

const AnimatedRadioButton = () => {
	return (
		<ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps='handled'>
			<RadioButton title='This is Radio Button' />
			<View style={styles.separator} />
			<RadioButton title='Custom Color' color='#ffa5ab' />
		</ScrollView>
	)
}

export default AnimatedRadioButton

const styles = StyleSheet.create({
	container: {
		padding: 16
	},
	separator: {
		height: 16
	}
})
