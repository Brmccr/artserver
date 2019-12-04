let express = require('express');
let router = express.Router();
let db = require('../db');
let jwt = require('jsonwebtoken');
let bcrypt = require('bcryptjs');
// let User = db.import('../models/user');
let User = db.sequelize.import('../models/user');

router.post('/register', function(req, res) {

    let username = req.body.username;
    let passwordhash = req.body.passwordhash;

    User.create({
        username: username,
        passwordhash: bcrypt.hashSync(passwordhash, 10),
        displayname: req.body.displayname,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        role: 'user'

    }).then(
        function createSuccess(user){

        let token = jwt.sign({id: user.id, role: user.role}, process.env.JWT_SECRET, {expiresIn :60*60*24});
            
            res.json({
                user: user,
                message: 'created',
                sessionToken: token
            });
        },
        function createError(err) {
            res.send(500, err.message);
        }
    );
});


router.post('/login', function(req, res) {

    User.findOne( { where: { username: req.body.username } } ).then(

        function(user){
            if (user) {
                
                bcrypt.compare(req.body.password, user.passwordhash, function(err, matches){
                
                    if(matches) {
                        let token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24});
                        res.json({
                            user: user,
                            message: "successfully authenticated",
                            sessionToken: token
                });
                    }else { 
                        res.status(502).send({ error: "Sign In Error"});
                    }
                });  
            } else {
                res.status(500).send({ error : "Failed to authenticate"});
            }
        },
        function(err) {
            res.status(501).send({error: "Login Error"});
        }
    );
});

module.exports = router;