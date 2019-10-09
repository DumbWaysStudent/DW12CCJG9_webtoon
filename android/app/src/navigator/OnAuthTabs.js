import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome5'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { createAppContainer} from 'react-navigation';
import { createBottomTabNavigator  } from 'react-navigation-tabs';
import ForYou from '../screens/OnAuth/ForYou'
import Favourite from '../screens/OnAuth/Favourite'
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