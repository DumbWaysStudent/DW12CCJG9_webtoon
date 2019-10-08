import { createAppContainer} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import LogIn from '../screens/LogIn'


const UnAuth = createStackNavigator({
        LogIn: {
            screen: LogIn,
            navigationOptions: () => ({
                header: null,
            })
        }
    },
    {
        initialRouteName: 'LogIn'
    }
);

export default createAppContainer(UnAuth);