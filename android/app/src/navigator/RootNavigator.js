import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import UnAuthS from './UnAuth';
import OnAuthT from './OnAuthTabs';
import OnAuthS from './OnAuthStack'

const RootNavigator = createSwitchNavigator({
    UnAuth: UnAuthS,
    OnAuthTabs: OnAuthT,
    OnAuthStack: OnAuthS
},
{
    initialRouteName: 'OnAuthStack',
})

export default createAppContainer(RootNavigator);