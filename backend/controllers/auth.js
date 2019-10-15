const jwt = require('jsonwebtoken');
const models = require('../models');

const User = models.user;

exports.login = (req, res) => {

    //check if email and pass match in db tbl user

    const email = req.body.email

    const password = req.body.password //use encryption in real world case!

    User.findOne({ where: { email, password} }).then(user => {
        if (user) {
            const token = 'Bearer ' + jwt.sign({ userId: user.id }, 'b4C0t1n4J4');
            res.send({
                user,
                token
            });
        } else {
            res.send({
                error: true,
                message: 'E-Mail and Password Not Valid'
            })
        }
    });
}