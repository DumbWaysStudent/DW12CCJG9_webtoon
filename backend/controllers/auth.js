const jwt = require('jsonwebtoken');
const models = require('../models');
const bcrypt = require('bcrypt');

const User = models.user;

exports.login = (req, res) => {

    //check if email and pass match in db tbl user

    const email = req.body.email

    const password = req.body.password //use encryption in real world case!

    User.findOne({where: {email}}).then(user=>{
        if(user){
            bcrypt.compare(password, user.password, function(err, result) {
                if (result == true) {
                    const token = 'Bearer ' +  jwt.sign({ userId: user.id }, 'b4C0t1n4J4');
                    res.send({
                        id: user.id,
                        name: user.name,
                        token
                    });
                } else {
                    res.send({
                        error: true,
                        message: 'Wrong Password!'
                    });
                }
            });
        } else {
            res.send({
                error: true,
                message: "E-Mail Not Registered"
            });
        }
    });
}