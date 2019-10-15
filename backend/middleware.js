const jwt = require('express-jwt');

exports.authenticated = jwt({secret: 'b4C0t1n4J4'});