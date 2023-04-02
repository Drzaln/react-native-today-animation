import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from './Home';
import Profile from './Profile';
import Discovery from './Discovery';
import Favourite from './Favourite';
import Icon from 'react-native-vector-icons/Foundation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

const BottomTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#4b3448',
        tabBarInactiveTintColor: '#c5c3c4',
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Discovery"
        component={Discovery}
        options={{
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="compass" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Favourite"
        component={Favourite}
        options={{
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="bookmark-minus"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="account-circle"
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;
