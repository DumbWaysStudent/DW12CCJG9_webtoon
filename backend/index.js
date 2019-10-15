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

// middleware
const { authenticated } = require('./middleware');

app.group('/api/v1/', (router) => {

    // API
    router.post('/login', AuthController.login);
    router.post('/register', UserController.registerUser);
    router.get('/webtoons', authenticated, WebtoonController.index);
    router.get('/webtoons/favourite', authenticated, WebtoonController.showFavourites);
    router.get('/webtoon/:title', authenticated, WebtoonController.showWebtoon);
});

app.listen(port, () => console.log(`Listen on Port ${port}`));