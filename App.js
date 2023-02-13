import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './src/screens/Home';
import SCREENS_LIST from './src/screenList';
import SCROLL_INDICATOR_SCREENS_LIST from './src/screenList/scrollindicatorList';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaView style={{flex: 1}}>
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
            {SCROLL_INDICATOR_SCREENS_LIST.map(item => (
              <Stack.Screen
                key={item.screenRoute}
                name={item.screenRoute}
                component={item.screen}
                options={{headerTitle: item.name}}
              />
            ))}
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default App;
