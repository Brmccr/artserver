let express = require('express');
let router = express.Router();
let db = require('../db');
let jwt = require('jsonwebtoken');
let bcrypt = require('bcryptjs');
// let User = db.import('../models/user');
const validateSession = require('../middleware/validate-session');
let User = db.sequelize.import('../models/user');



router.get('/', function(req, res) {
    res.send('Hey!! This is a test route!');
})



    router.post('/artcreate', validateSession, function(req, res) {
        const artItem = {
            title: req.body.title,
            price: req.body.price,
            img: req.body.img,
            genre: req.body.genre
        }
            console.log(artItem)
    
        db.arts.create(artItem)
            .then(manga => res.status(200).json(manga))
            .catch(err => res.json(req.errors));
    })


    router.get('/artgenrephotography', (req, res) => {
        db.arts.findAll({
            where: {genre : "Photography"}
        }).then(manga => res.status(200).json(manga))
        .catch(err => res.status(500).json({
            error: err
        }))
    })

    router.get('/artgenrepaintings', (req, res) => {
        db.arts.findAll({
            where: {genre : "Paintings"}
        }).then(manga => res.status(200).json(manga))
        .catch(err => res.status(500).json({
            error: err
        }))
    })

    router.get('/artgetall', (req, res) => {
        db.arts.findAll({
            where: { model: db.arts}
        }).then(manga => res.status(200).json(manga))
        .catch(err => res.status(500).json({
            error: err
        }))
    })

module.exports = router;