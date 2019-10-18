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

    // ------------------- API ----------------------//
    
    // LOGIN
    router.post('/login', AuthController.login);
    // REGISTER
    router.post('/register', UserController.registerUser);
    // GET ALL WEBTOONS
    router.get('/webtoons', authenticated, WebtoonController.index);
    // GET ALL WEBTOONS CHOICES
    router.get('/webtoons/choices', authenticated, WebtoonController.showChoicesWebtoons);
    // GET ALL POPULAR WEBTOONS
    router.get('/webtoons/popular', authenticated, WebtoonController.showPolpularWebtoons);
    // GET ALL MY FAVOURITE WEBTOONS
    router.get('/user/:user_id/webtoons/favourite', authenticated, FavouriteController.showMyFavourites);
    // router.get('/webtoons/favourite', authenticated, FavouriteController.showFavourites);
    // GET WEBTOON BASED ON TITLE
    router.get('/webtoon/:title', authenticated, WebtoonController.showWebtoon);
    // ADD FAVOURITE WEBTOON
    router.post('/user/:user_id/webtoon/:webtoon_id/favourite', authenticated, FavouriteController.addMyFavourite);
    // DELETE FAVOURITE WEBTOON
    router.delete('/user/:user_id/webtoon/:webtoon_id/favourite/:favourite_id', authenticated, FavouriteController.deleteMyFavourite);
    // SHOW MY WEBTOONS
    router.get('/user/:user_id/webtoons', authenticated, WebtoonController.showMyWebtoons);
    // CREATE MY WEBTOON
    router.post('/user/:user_id/webtoon', authenticated, WebtoonController.createMyWebtoon);
    // UPDATE MY WEBTOON
    router.put('/user/:user_id/webtoon/:webtoon_id', authenticated, WebtoonController.updateMyWebtoon);
    // DELETE MY WEBTOON
    router.delete('/user/:user_id/webtoon/:webtoon_id', authenticated, WebtoonController.deleteMyWebtoon);
    // GET ALL WEBTOON EPISODE
    router.get('/webtoon/:webtoon_id/episodes', authenticated, EpisodeController.showWebtoonEpisodes);
    // ADD WEBTOON EPISODE
    router.post('/user/:user_id/webtoon/:webtoon_id/episode', authenticated, EpisodeController.createEpisode);
    // UPDATE WEBTOON EPISODE
    router.put('/user/:user_id/webtoon/:webtoon_id/episode/:episode_id', authenticated, EpisodeController.updateEpisode);
    // DELETE WEBTOON EPISODE
    router.delete('/user/:user_id/webtoon/:webtoon_id/episode/:episode_id', authenticated, EpisodeController.deleteEpisode);
    // GET ALL WEBTOON EPISODE PAGE
    router.get('/webtoon/:webtoon_id/episode/:episode_id', authenticated, EpisodeController.showWebtoonEpisodePages);
    // CREATE PAGE IMAGE
    router.post('/user/:user_id/webtoon/:webtoon_id/episode/:episode_id/image', authenticated, ImageController.createImage);
    // DELETE PAGE IMAGE
    router.delete('/user/:user_id/webtoon/:webtoon_id/episode/:episode_id/image/:image_id', authenticated, ImageController.deleteImage);
});

app.listen(port, () => console.log(`Listen on Port ${port}`));