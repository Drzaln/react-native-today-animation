import React from 'react'
import { StyleSheet, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import Check1 from './components/Check1'

const index = () => {
	return (
		<ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps='handled'>
			<Check1 textContent='Check item' />
			<View style={styles.separator} />
			<Check1 color='#283618' textContent='Custom color? Check' />
			<View style={styles.separator} />
			<Check1 color='#78290f' size={28} textContent='Custom size? Check' />
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
