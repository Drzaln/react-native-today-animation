import React from 'react'
import { StyleSheet, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import LiquidSwitch from './components/LiquidSwitch'

const index = () => {
	return (
		<ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps='handled'>
			<LiquidSwitch title='Switch Button' />
			<View style={styles.separator} />
			<LiquidSwitch title='Custom Color' inactiveColor='#d9d9d9' activeColor='#55a630' />
		</ScrollView>
	)
}

export default index

const styles = StyleSheet.create({
	container: {
		padding: 16
	},
	separator: {
		height: 16
	}
})
