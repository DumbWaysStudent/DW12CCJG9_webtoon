const express = require('express');
const bodyParser = require('body-parser');
require('express-group-routes');

const app = express();
const port = 5320;

app.use(bodyParser.json());

// controllers
const AuthController = require('./controllers/auth');
const UserController = require('./controllers/user');

// middleware
app.group('/api/v1/', (router) => {
    router.post('/login', AuthController.login);
    router.post('/register', UserController.registerUser);
});

app.listen(port, () => console.log(`Listen on Port ${port}`));