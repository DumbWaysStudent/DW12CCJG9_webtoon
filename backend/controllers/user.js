const bcrypt = require('bcrypt');
const db = require('../models');
const User = db.user;

const registerUser = (req, res) => {
    const {email, password, name} = req.body;
    bcrypt.hash(password, 10, (err, hash) => {
        if (err) throw err;

        User.create({
            email,
            password: hash,
            name
        })
        .then((user) => {
            res.send(user);
        });
    });
}

module.exports = {
    registerUser
}