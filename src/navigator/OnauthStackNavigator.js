import { createAppContainer} from 'react-navigation';
import { createStackNavigator  } from 'react-navigation-stack';
import MyWebtoonCreation from '../screens/MyWebtoonCreation';
import CreateWebtoon from '../screens/CreateWebtoon';
import CreateWebtoonEpisode from '../screens/CreateWebtoonEpisode';
import EditMyWebtoon from '../screens/EditMyWebtoon';
import EditMyWebtoonEpisode from '../screens/EditMyWebtoonEpisode'
import DetailWebtoon from '../screens/DetailWebtoon';
import DetailEpisode from '../screens/DetailEpisode'
import OnauthTabNavigator from './OnauthTabNavigator';

const OnAuthStack = createStackNavigator ({
    Home: {
        screen: OnauthTabNavigator,
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
})

export default createAppContainer(OnAuthStack);