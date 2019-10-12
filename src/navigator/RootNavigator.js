import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import UnAuthStack from './UnauthStack';
import OnAuthStack from './OnauthStackNavigator'

const RootNavigator = createSwitchNavigator({
    UnAuthStack: UnAuthStack,
    OnAuthStack: OnAuthStack
},
{
    initialRouteName: 'UnAuthStack',
})

export default createAppContainer(RootNavigator);