import React from 'react';
import { createAppContainer} from 'react-navigation';
import { createStackNavigator  } from 'react-navigation-stack';
import EditProfile from '../screens/OnAuth/EditProfile';
import MyWebtoonCreation from '../screens/OnAuth/MyWebtoonCreation';
import CreateWebtoon from '../screens/OnAuth/CreateWebtoon';
import CreateWebtoonEpisode from '../screens/OnAuth/CreateWebtoonEpisode';

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
    CreateWebtoon: {
        screen: CreateWebtoon,
        navigationOptions: () => ({
            header: null
        })
    },
    CreateWebtoonEpisode: {
        screen: CreateWebtoonEpisode,
        navigationOptions: () => ({
            header: null
        })
    }
},
{
    initialRouteName: 'EditProfile'
})

export default createAppContainer(OnAuthProfileStack);