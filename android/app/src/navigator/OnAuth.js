import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome5'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { createAppContainer} from 'react-navigation';
import { createBottomTabNavigator  } from 'react-navigation-tabs';
import ForYou from '../screens/ForYou'
import Favourite from '../screens/Favourite'
import Profile from '../screens/Profile'

const OnAuth = createBottomTabNavigator ({
        ForYou: {
            screen: ForYou,
            navigationOptions: () => ({
                header: null,
                tabBarLabel: "For You",
                tabBarIcon: ({ tintColor }) => (
                <AntDesign name="appstore1" size={18} color={tintColor} />)
            })
        },
        Favourite: {
            screen: Favourite,
            navigationOptions: () => ({
                header: null,
                tabBarLabel: "Favourite",
                tabBarIcon: ({ tintColor }) => (
                <AntDesign name="star" size={18} color={tintColor} />),
            })
        },
        Profile: {
            screen: Profile,
            navigationOptions: () => ({
                header: null,
                tabBarLabel: "Profile",
                tabBarIcon: ({ tintColor }) => (
                <FontAwesome name="user" size={18} color={tintColor} />)
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
            activeTintColor: '#fc9003',
            inactiveTintColor: 'gray',
            style: {marginVertical: 5},
            labelStyle: {fontWeight: 'bold'}
          },
    }
);

export default createAppContainer(OnAuth);