import React from 'react';
import { createAppContainer} from 'react-navigation';
import { createStackNavigator  } from 'react-navigation-stack';
import EditProfile from '../screens/OnAuth/EditProfile';

const OnAuthProfileStack = createStackNavigator ({
    EditProfile: {
        screen: EditProfile,
        navigationOptions: () => ({
            header: null
        })
    }
},
{
    initialRouteName: 'EditProfile'
})

export default createAppContainer(OnAuthProfileStack);