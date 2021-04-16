import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { enableScreens } from 'react-native-screens'
import { createStackNavigator } from '@react-navigation/stack'
import Home from './src/screens/Home'
import SCREENS_LIST from './src/screenList'
enableScreens()

const Stack = createStackNavigator()

const App = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator screenOptions={{ headerStyle: { elevation: 1 } }}>
				<Stack.Screen name='Home' component={Home} />
				{SCREENS_LIST.map((item) => (
					<Stack.Screen
						key={item.name}
						name={toString(item.screen)}
						component={item.screen}
						options={{ headerTitle: item.name }}
					/>
				))}
			</Stack.Navigator>
		</NavigationContainer>
	)
}

export default App
