const bcrypt = require('bcrypt');
const models = require('../models');
const jwt = require('jsonwebtoken');
const errorHandler = require('../handlers/errorHandler.js');
const User = models.user;

const registerUser = (req, res) => {
    const {email, password, name} = req.body;
    if (email == "" || password == "" || name == "") {
        res.send({
            error: true,
            message: 'field cannot be empty!'
        })
    } else {
        bcrypt.hash(password, 10, (err, hash) => {
            if (err) throw err;
            User.create({
                email,
                password: hash,
                name
            },{
                attributes: ['id', "name"]
            })
            .then((user) => {
                const token = 'Bearer ' +  jwt.sign({ userId: user.id }, 'b4C0t1n4J4');
                res.send({
                    id: user.id,
                    name: user.name,
                    token
                });
            })
            .catch((error) => {
                console.log(error)
                res.send({
                    error: true
                });
            });  
        });
    }
}

module.exports = {
    registerUser
}