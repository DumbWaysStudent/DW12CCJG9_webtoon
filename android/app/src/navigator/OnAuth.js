import { createAppContainer} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import For_You from '../screens/For_You'


const OnAuth = createStackNavigator({
        For_You: {
            screen: For_You,
            navigationOptions: () => ({
                header: null,
            })
        }
    },
    {
        initialRouteName: 'For_You'
    }
);

export default createAppContainer(OnAuth);