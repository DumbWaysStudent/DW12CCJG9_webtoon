import { createAppContainer} from 'react-navigation';
import { createStackNavigator  } from 'react-navigation-stack';
import OnauthTabNavigator from './OnauthTabNavigator';
import DetailWebtoon from '../screens/DetailWebtoon';
import DetailEpisode from '../screens/DetailEpisode';
import MyWebtoonCreation from '../screens/MyWebtoonCreation'
import CreateWebtoon from '../screens/CreateWebtoon'
import CreateWebtoonEpisode from '../screens/CreateWebtoonEpisode'
import EditMyWebtoon from '../screens/EditMyWebtoon'
import EditMyWebtoonEpisode from '../screens/EditMyWebtoonEpisode'

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
    },
    EditMyWebtoon: {
        screen: EditMyWebtoon,
        navigationOptions: () => ({
            header: null
        })
    },
    EditMyWebtoonEpisode: {
        screen: EditMyWebtoonEpisode,
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