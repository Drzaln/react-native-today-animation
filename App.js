import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './src/screens/Home';
import SCREENS_LIST from './src/screenList';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerStyle: {elevation: 1}}}>
        <Stack.Screen name="Home" component={Home} />
        {SCREENS_LIST.map(item => (
          <Stack.Screen
            key={item.screenRoute}
            name={item.screenRoute}
            component={item.screen}
            options={{headerTitle: item.name}}
          />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
