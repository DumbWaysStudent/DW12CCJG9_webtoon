import React from 'react';
import { createAppContainer} from 'react-navigation';
import { createStackNavigator  } from 'react-navigation-stack';
import DetailWebtoon from '../screens/OnAuth/DetailWebtoon';
import DetailEpisode from '../screens/OnAuth/DetailEpisode'

const OnAuthHomeStack = createStackNavigator ({
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
})

export default createAppContainer(OnAuthHomeStack);