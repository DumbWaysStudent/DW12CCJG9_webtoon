import React from 'react';
import { createAppContainer} from 'react-navigation';
import { createStackNavigator  } from 'react-navigation-stack';
import EditProfile from '../screens/OnAuth/EditProfile';
import MyWebtoonCreation from '../screens/OnAuth/MyWebtoonCreation'

const OnAuthProfileStack = createStackNavigator ({
    EditProfile: {
        screen: EditProfile,
        navigationOptions: () => ({
            header: null
        })
    },
    MyWebtoonCreation: {
        screen: MyWebtoonCreation,
        navigationOptions: () => ({
            header: null
        })
    },
},
{
    initialRouteName: 'MyWebtoonCreation'
})

export default createAppContainer(OnAuthProfileStack);