import { createAppContainer} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import SignIn from '../screens/SignIn'
import SignUp from '../screens/SignUp';
import LoadingScreen from '../screens/LoadingScreen'


const UnauthStackNavigator = createStackNavigator({
        SignIn: {
            screen: SignIn,
            navigationOptions: () => ({
                header: null,
            })
        },
        SignUp: {
            screen: SignUp,
            navigationOptions: () => ({
                header: null
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

export default createAppContainer(UnauthStackNavigator);