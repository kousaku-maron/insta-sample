import React from 'react'
import { Platform } from 'react-native'
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation'
import { Icon } from 'expo'
import HomeScreen from './containers/HomeScreen'
import DetailScreen from './containers/DetailScreen'
import FeedScreen from './containers/FeedScreen'
import ProfileScreen from './containers/ProfileScreen'
import ProfileEditScreen from './containers/ProfileEditScreen'

const HomeStack = createStackNavigator(
  {
    Home: {
      screen: HomeScreen
    },
    Detail: {
      screen: DetailScreen
    },
  },
  {
    initialRouteName: 'Home',
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused }) => (
        <Icon.Ionicons
          name={
            Platform.OS === 'ios'
              ? 'ios-home'
              : 'md-home'
          }
          size={26}
          style={{ marginBottom: -3 }}
          color={focused ? 'black' : 'gray'}
        />
      ),
    }),
  }
)

const FeedStack = createStackNavigator(
  {
    Feed: {
      screen: FeedScreen
    },
    Detail: {
      screen: DetailScreen
    },
  },
  {
    initialRouteName: 'Feed',
    navigationOptions: {
      tabBarIcon: ({ focused }) => (
        <Icon.Ionicons
          name={
            Platform.OS === 'ios'
              ? 'ios-add'
              : 'md-add'
          }
          size={26}
          style={{ marginBottom: -3 }}
          color={focused ? 'black' : 'gray'}
        />
      ),
    },
  }
)

const ProfileStack = createStackNavigator(
  {
    Profile: {
      screen: ProfileScreen
    },
    Edit: {
      screen: ProfileEditScreen
    },
  },
  {
    initialRouteName: 'Profile',
    navigationOptions: {
      tabBarIcon: ({ focused }) => (
        <Icon.Ionicons
          name={
            Platform.OS === 'ios'
              ? 'ios-person'
              : 'md-person'
          }
          size={26}
          style={{ marginBottom: -3 }}
          color={focused ? 'black' : 'gray'}
        />
      ),
    },
  }
)

const TabNavigator = createBottomTabNavigator(
  {
    Home: HomeStack,
    Feed: FeedStack,
    Profile: ProfileStack,
  },
  {
    tabBarOptions: {
      activeTintColor: 'black',
      inactiveTintColor: 'gray',
    }
  }
)

export default TabNavigator
