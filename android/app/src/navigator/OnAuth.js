import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5'
import { createAppContainer} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator  } from 'react-navigation-tabs';
import ForYou from '../screens/ForYou'
import Favourite from '../screens/Favourite'
import Profile from '../screens/Profile'

const OnAuth = createBottomTabNavigator ({
        ForYou: {
            screen: ForYou,
            navigationOptions: () => ({
                header: null,
                tabBarLabel: "ForYou",
                tabBarIcon: ({ tintColor }) => (
                <Icon name="home" size={18} color={tintColor} />)
            })
        },
        Favourite: {
            screen: Favourite,
            navigationOptions: () => ({
                header: null,
                tabBarLabel: "Favourite",
                tabBarIcon: ({ tintColor }) => (
                <Icon name="star" size={18} color={tintColor} />)
            })
        },
        Profile: {
            screen: Profile,
            navigationOptions: () => ({
                header: null,
                tabBarLabel: "Profile",
                tabBarIcon: ({ tintColor }) => (
                <Icon name="user" size={18} color={tintColor} />)
            })
        },
        // EditProfile: {

        // },
        // DetailWebtoon: {

        // },
        // DetailEpisode: {

        // },
        // MyWebtoonCreation: {

        // },
        // CreateWebtoon: {

        // },
        // CreateWebtoonEpisode: {

        // },
        // EditMyWebtoon: {

        // },
        // EditMyWebtoonEpisode: {

        // }
    },
    {
        initialRouteName: 'ForYou',
        tabBarOptions: {
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray',
          },
    }
);

export default createAppContainer(OnAuth);