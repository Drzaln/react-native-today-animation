import React from 'react'
import { StyleSheet } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import DownloadButton from './components/DownloadButton'

const AnimateButton = () => {
	return (
		<ScrollView contentContainerStyle={styles.container}>
			<DownloadButton />
		</ScrollView>
	)
}

export default AnimateButton

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		paddingVertical: 16
	}
})
