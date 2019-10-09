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
<<<<<<< HEAD
    initialRouteName: 'OnAuthStack',
=======
    initialRouteName: 'OnAuthTabs',
>>>>>>> 74d1dde835de31d22a536cd5d082592645d7bc51
})

export default createAppContainer(RootNavigator);