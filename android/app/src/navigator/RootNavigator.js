import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import UnAuthS from './UnAuth';
import OnAuthT from './OnAuthTabs';
import OnAuthHomeStack from './OnAuthHomeStack';
import OnAuthProfileStack from './OnAuthProfileStack'

const RootNavigator = createSwitchNavigator({
    UnAuth: UnAuthS,
    OnAuthTabs: OnAuthT,
    OnAuthHomeStack: OnAuthHomeStack,
    OnAuthProfileStack: OnAuthProfileStack
},
{
    initialRouteName: 'OnAuthTabs',
})

export default createAppContainer(RootNavigator);