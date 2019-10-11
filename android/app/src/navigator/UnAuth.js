import { createAppContainer} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import LogIn from '../screens/UnAuth/LogIn'
import LoadingScreen from '../screens/UnAuth/LoadingScreen'


const UnAuth = createStackNavigator({
        LogIn: {
            screen: LogIn,
            navigationOptions: () => ({
                header: null,
            })
        },
        LoadingScreen: {
            screen: LoadingScreen,
            navigationOptions: () => ({
                header: null,
            })
        }
    },
    {
        initialRouteName: 'LoadingScreen'
    }
);

export default createAppContainer(UnAuth);