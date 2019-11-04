import { createAppContainer} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import SignIn from '../screens/SignIn'
import SignUp from '../screens/SignUp'
import Splash from '../screens/Splash'


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
                headerStyle: {
                    backgroundColor: '#383332',
                    height: 50,
                    color: '#fff',
                },
                headerTintColor: '#fff'
            })
        },
        Splash: {
            screen: Splash,
            navigationOptions: () => ({
                header: null,
            })
        }
    },
    {
        initialRouteName: 'Splash'
    }
);

export default createAppContainer(UnauthStackNavigator);