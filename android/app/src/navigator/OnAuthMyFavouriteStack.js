import React from 'react';
import { createAppContainer} from 'react-navigation';
import { createStackNavigator  } from 'react-navigation-stack';
import MyFavourite from '../screens/OnAuth/MyFavourite';

const OnAuthMyFavouriteStack = createStackNavigator ({
    MyFavourite: {
        screen: MyFavourite,
        navigationOptions: () => ({
            header: null
        })
    }
},
{
    initialRouteName: 'MyFavourite'
})

export default createAppContainer(OnAuthMyFavouriteStack);