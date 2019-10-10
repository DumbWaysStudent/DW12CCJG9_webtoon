import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome5'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { createAppContainer} from 'react-navigation';
import { createBottomTabNavigator  } from 'react-navigation-tabs';
import ForYou from '../screens/OnAuth/ForYou'
import MyFavourite from '../screens/OnAuth/MyFavourite'
import Profile from '../screens/OnAuth/Profile'

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
            screen: Profile,
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
            activeTintColor: '#fc9003',
            inactiveTintColor: 'gray',
            style: {marginVertical: 5},
            labelStyle: {fontWeight: 'bold'}
          },
    }
);

export default createAppContainer(OnAuthTabs);