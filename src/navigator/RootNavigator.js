import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import UnauthStackNavigator from './UnauthStackNavigator';
import OnauthStackNavigator from './OnauthStackNavigator'

const RootNavigator = createSwitchNavigator({
    UnauthStackNavigator,
    OnauthStackNavigator
},
{
    initialRouteName: 'UnauthStackNavigator',
})

export default createAppContainer(RootNavigator);