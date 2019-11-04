//combine all reducer
import { combineReducers } from 'redux';
import { createNavigationReducer } from 'react-navigation-redux-helpers';

import RootNavigator from './../../navigator/RootNavigator'
import reducerWebtoon from './../reducers/reducerWebtoon';
import reducerFavourite from './../reducers/reducerFavourite';
import reducerEpisode from './../reducers/reducerEpisode';
import reducerImage from './../reducers/reducerImage';
import reducerProfile from './../reducers/reducerProfile';

const reducerRouter = createNavigationReducer(RootNavigator);

const appReducer = combineReducers({
  router: reducerRouter,
  webtoons: reducerWebtoon,
  favourites: reducerFavourite,
  episodes: reducerEpisode,
  images: reducerImage,
  profile: reducerProfile
})

export default appReducer