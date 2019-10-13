import { createAppContainer} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import LoadingScreen from '../screens/LoadingScreen'
import LogIn from '../screens/LogIn'


const UnauthNavigator = createStackNavigator({
        LoadingScreen: {
            screen: LoadingScreen,
            navigationOptions: () => ({
                header: null,
            })
        },
        LogIn: {
            screen: LogIn,
            navigationOptions: () => ({
                header: null,
            })
        }
    },
    {
        initialRouteName: 'LoadingScreen'
    }
);

export default createAppContainer(UnauthNavigator);