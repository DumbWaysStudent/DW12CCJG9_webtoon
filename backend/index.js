const express = require('express');
const bodyParser = require('body-parser');
require('express-group-routes');

const app = express();
const port = 5320;

app.use(bodyParser.json());

// controllers
const AuthController = require('./controllers/auth');
const UserController = require('./controllers/user');
const WebtoonController = require('./controllers/webtoon');
const FavouriteController = require('./controllers/favourite');
const EpisodeController = require('./controllers/episode');
const ImageController = require('./controllers/image');

// middleware
const { authenticated } = require('./middleware');

app.group('/api/v1/', (router) => {

    // ------------- AUTH ---------------// 
    router.post('/login', AuthController.login);

    // ------------- USER ---------------//
    router.post('/register', UserController.registerUser);



    // ------------- WEBTOON ---------------//
    router.get('/webtoons', authenticated, WebtoonController.index);
    router.get('/webtoons/choices', authenticated, WebtoonController.showChoicesWebtoons)
    router.get('/webtoons/popular', authenticated, WebtoonController.showPolpularWebtoons);
    router.get('/user/:user_id/webtoons/favourite', authenticated, FavouriteController.showMyFavourites);
    router.get('/webtoon/:title', authenticated, WebtoonController.showWebtoon);
    router.post('/user/:user_id/webtoon/:webtoon_id/favourite', authenticated, FavouriteController.addMyFavourite);
    router.delete('/user/:user_id/webtoon/:webtoon_id/favourite/:favourite_id', authenticated, FavouriteController.deleteMyFavourite);
    router.get('/user/:user_id/webtoons', authenticated, WebtoonController.showMyWebtoons);
    router.post('/user/:user_id/webtoon', authenticated, WebtoonController.createMyWebtoon);
    router.put('/user/:user_id/webtoon/:webtoon_id', authenticated, WebtoonController.updateMyWebtoon);
    router.delete('/user/:user_id/webtoon/:webtoon_id', authenticated, WebtoonController.deleteMyWebtoon);
    // router.get('/webtoons/favourite', authenticated, FavouriteController.showFavourites);



    // ------------- EPISODE ---------------//
    router.get('/webtoon/:webtoon_id/episodes', authenticated, EpisodeController.showWebtoonEpisodes);
    router.post('/user/:user_id/webtoon/:webtoon_id/episode', authenticated, EpisodeController.createEpisode);
    router.put('/user/:user_id/webtoon/:webtoon_id/episode/:episode_id', authenticated, EpisodeController.updateEpisode);
    router.delete('/user/:user_id/webtoon/:webtoon_id/episode/:episode_id', authenticated, EpisodeController.deleteEpisode);
    router.get('/webtoon/:webtoon_id/episode/:episode_id', authenticated, EpisodeController.showWebtoonEpisodePages);
    


    // ------------- IMAGE ---------------//
    router.post('/user/:user_id/webtoon/:webtoon_id/episode/:episode_id/image', authenticated, ImageController.createImage);
    router.delete('/user/:user_id/webtoon/:webtoon_id/episode/:episode_id/image/:image_id', authenticated, ImageController.deleteImage);
});

app.listen(port, () => console.log(`Listen on Port ${port}`));