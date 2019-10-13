import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import UnauthStackNavigator from './UnauthsStackNavigator';
import OnauthStackNavigator from './OnauthStackNavigator'

const RootNavigator = createSwitchNavigator({
    UnauthStackNavigator: UnauthStackNavigator,
    OnauthStackNavigator: OnauthStackNavigator
},
{
    initialRouteName: 'OnauthStackNavigator',
})

export default createAppContainer(RootNavigator);