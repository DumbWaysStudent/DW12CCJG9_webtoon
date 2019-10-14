const express = require('express');
const bodyParser = require('body-parser');
require('express-group-routes');

const app = express();
const port = 5320;

app.use(bodyParser.json());

// controllers
const AuthController = require('./controllers/auth');

// middleware
app.group('/api/v1/', (router) => {
    router.post('/login', AuthController.login);
});

app.listen(port, () => console.log(`Listen on Port ${port}`));