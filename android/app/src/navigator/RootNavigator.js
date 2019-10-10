import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import UnAuthS from './UnAuth';
import OnAuthT from './OnAuthTabs';
import OnAuthStack from './OnAuthStack'

const RootNavigator = createSwitchNavigator({
    UnAuth: UnAuthS,
    OnAuthTabs: OnAuthT,
    OnAuthStack: OnAuthStack
},
{
    initialRouteName: 'UnAuth',
})

export default createAppContainer(RootNavigator);