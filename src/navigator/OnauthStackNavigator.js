import { createAppContainer} from 'react-navigation';
import { createStackNavigator  } from 'react-navigation-stack';
import OnauthTabNavigator from './OnauthTabNavigator';
import DetailWebtoon from '../screens/DetailWebtoon';
import DetailEpisode from '../screens/DetailEpisode';

const OnauthStackNavigator = createStackNavigator ({
    Home: {
        screen: OnauthTabNavigator,
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
    }
},
{
    initialRouteName: 'Home'
}
)

export default createAppContainer(OnauthStackNavigator);