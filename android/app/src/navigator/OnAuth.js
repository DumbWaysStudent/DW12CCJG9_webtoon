import { createAppContainer} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import ForYou from '../screens/ForYou'


const OnAuth = createStackNavigator({
        ForYou: {
            screen: ForYou,
            navigationOptions: () => ({
                header: null,
            })
        },
        // Favourite: {

        // },
        // Profile: {

        // },
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
        initialRouteName: 'ForYou'
    }
);

export default createAppContainer(OnAuth);