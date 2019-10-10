import React from 'react';
import { createAppContainer} from 'react-navigation';
import { createStackNavigator  } from 'react-navigation-stack';
import MyWebtoonCreation from '../screens/OnAuth/MyWebtoonCreation';
import CreateWebtoon from '../screens/OnAuth/CreateWebtoon';
import CreateWebtoonEpisode from '../screens/OnAuth/CreateWebtoonEpisode';
import EditMyWebtoon from '../screens/OnAuth/EditMyWebtoon';
import EditMyWebtoonEpisode from '../screens/OnAuth/EditMyWebtoonEpisode'
import DetailWebtoon from '../screens/OnAuth/DetailWebtoon';
import DetailEpisode from '../screens/OnAuth/DetailEpisode'

const OnAuthStack = createStackNavigator ({
    MyWebtoonCreation: {
        screen: MyWebtoonCreation,
        navigationOptions: () => ({
            header: null
        })
    },
    EditMyWebtoon: {
        screen: EditMyWebtoon,
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
    },
    EditMyWebtoonEpisode: {
        screen: EditMyWebtoonEpisode,
        navigationOptions: () => ({
            header: null
        })
    },
    DetailWebtoon: {
        screen: DetailWebtoon,
        navigationOptions: () => ({
            header: null
        })
    },
    DetailEpisode: {
        screen: DetailEpisode,
        navigationOptions: () => ({
            header: null
        })
    },
},
{
    initialRouteName: 'EditMyWebtoonEpisode'
})

export default createAppContainer(OnAuthStack);