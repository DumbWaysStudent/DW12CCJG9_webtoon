import React from 'react';
import { createAppContainer} from 'react-navigation';
import { createStackNavigator  } from 'react-navigation-stack';
import DetailWebtoon from '../screens/OnAuth/DetailWebtoon';

const OnAuthStack = createStackNavigator ({
    // EditProfile: {

    // },
    DetailWebtoon: {
        screen: DetailWebtoon,
        navigationOptions: () => ({
            header: null
        })
    },
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
    initialRouteName: 'DetailWebtoon'
})

export default createAppContainer(OnAuthStack);