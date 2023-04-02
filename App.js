import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './src/screens/Home';
import SCREENS_LIST from './src/screenList';
import SCROLL_INDICATOR_SCREENS_LIST from './src/screenList/scrollindicatorList';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import FOOD_SCREENS_LIST from './src/screenList/foodList';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{headerStyle: {elevation: 1}}}>
            <Stack.Screen name="Home" component={Home} />
            {SCREENS_LIST.map(item => (
              <Stack.Screen
                key={item.screenRoute}
                name={item.screenRoute}
                component={item.screen}
                options={{
                  headerTitle: item.name,
                  headerShown: item.name.includes('App') ? false : true,
                }}
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
            {FOOD_SCREENS_LIST.map(item => (
              <Stack.Screen
                key={item.screenRoute}
                name={item.screenRoute}
                component={item.screen}
                options={{headerTitle: item.name, headerShown: false}}
              />
            ))}
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default App;
