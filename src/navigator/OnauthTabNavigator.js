import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome5'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { createAppContainer} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator  } from 'react-navigation-tabs';
import ForYou from '../screens/ForYou'
import MyFavourite from '../screens/MyFavourite'
import Profile from '../screens/Profile'
import EditProfile from '../screens/EditProfile'

const ProfileStackNavigator = createStackNavigator({
    Profile: {
        screen: Profile,
        navigationOptions: () => ({
            header: null
        })
    },
    EditProfile: {
        screen: EditProfile,
        navigationOptions: () => ({
            header: null
        })
    }
})

const OnAuthTabs = createBottomTabNavigator ({
        ForYou: {
            screen: ForYou,
            navigationOptions: () => ({
                header: null,
                tabBarLabel: "For You",
                tabBarIcon: ({ tintColor }) => (
                <AntDesign name="appstore1" size={18} color={tintColor} />)
            })
        },
        MyFavourite: {
            screen: MyFavourite,
            navigationOptions: () => ({
                header: null,
                tabBarLabel: "My Favourite",
                tabBarIcon: ({ tintColor }) => (
                <AntDesign name="star" size={18} color={tintColor} />),
            })
        },
        Profile: {
            screen: ProfileStackNavigator,
            navigationOptions: () => ({
                header: null,
                tabBarLabel: "Profile",
                tabBarIcon: ({ tintColor }) => (
                <FontAwesome name="user" size={18} color={tintColor} />)
            })
        },
    },
    {
        initialRouteName: 'ForYou',
        tabBarOptions: {
            activeTintColor: '#ee7a33',
            inactiveTintColor: '#965533',
            style: {paddingVertical: 5, backgroundColor:'#383332', height: 60},
            labelStyle: {fontWeight: 'bold'}
          },
    }
);

export default createAppContainer(OnAuthTabs);