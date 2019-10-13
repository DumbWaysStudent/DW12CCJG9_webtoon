import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import UnauthStackNavigator from './UnauthsStackNavigator';

const RootNavigator = createSwitchNavigator({
    UnauthStackNavigator
},
{
    initialRouteName: 'UnauthStackNavigator'
})

export default createAppContainer(RootNavigator);