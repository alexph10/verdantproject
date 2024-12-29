import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import HomeScreen from '../screens/HomeScreen';
import FootprintScreen from '../screens/FootprintScreen';
import ChallengesScreen from '../screens/ChallengesScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={{
      tabBarActiveTintColor: theme.colors.primary,
      tabBarInactiveTintColor: theme.colors.text,
      headerShown: false,
    }}>
    <Tab.Screen
      name="Home"
      component={HomeScreen}
      options={{
        tabBarIcon: ({ color }) => (
          <Icon name="home" size={24} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="Footprint"
      component={FootprintScreen}
      options={{
        tabBarIcon: ({ color }) => (
          <Icon name="chart-line" size={24} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="Challenges"
      component={ChallengesScreen}
      options={{
        tabBarIcon: ({ color }) => (
          <Icon name="trophy" size={24} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        tabBarIcon: ({ color }) => (
          <Icon name="account" size={24} color={color} />
        ),
      }}
    />
  </Tab.Navigator>
);

export default function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Main"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}