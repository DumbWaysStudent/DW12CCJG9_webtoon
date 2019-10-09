import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import UnAuthS from './UnAuth';
import OnAuthT from './OnAuthTabs';


const RootNavigator = createSwitchNavigator({
    UnAuth: UnAuthS,
    OnAuthTabs: OnAuthT,
    // OnAuthStack: OnAuthS
},
{
    initialRouteName: 'OnAuthTabs',
})

export default createAppContainer(RootNavigator);