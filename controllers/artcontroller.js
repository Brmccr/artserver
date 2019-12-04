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
            artist: req.body.artist,
            price: req.body.price,
            img: req.body.img,
            genre: req.body.genre,
            description: req.body.description
        }
            console.log(artItem)
    
        db.arts.create(artItem)
            .then(art => res.status(200).json(art))
            .catch(err => res.json(req.errors));
    })


    router.get('/artgenrephotography', (req, res) => {
        db.arts.findAll({
            where: {genre : "Photography"}
        }).then(art => res.status(200).json(art))
        .catch(err => res.status(500).json({
            error: err
        }))
    })

    router.get('/artgenrepaintings', (req, res) => {
        db.arts.findAll({
            where: {genre : "Painting"}
        }).then(art => res.status(200).json(art))
        .catch(err => res.status(500).json({
            error: err
        }))
    })

    router.get('/artgenredigital', (req, res) => {
        db.arts.findAll({
            where: {genre : "Digital"}
        }).then(art => res.status(200).json(art))
        .catch(err => res.status(500).json({
            error: err
        }))
    })

    router.get('/artgenredrawing', (req, res) => {
        db.arts.findAll({
            where: {genre : "Drawing"}
        }).then(art => res.status(200).json(art))
        .catch(err => res.status(500).json({
            error: err
        }))
    })

    router.get('/artgetall', (req, res) => {
        db.arts.findAll({
        }).then(art => res.status(200).json(art))
        .catch(err => res.status(500).json({
            error: err
        }))
    })

    router.put('/:id', validateSession, (req, res) => {
        db.arts.update(req.body.art, {
             where: {
              id: req.params.id
            }
         })
         .then(art => res.json(
             {art: art}
         ))
         .catch(err => res.json({
              error: err
           }))
           console.log(req);
     })

    //  router.put('/:id', validateSession, (req, res) => { // validateSession, 
    //     db.comments.update(req.body, {
    //         where: {
    //             id: req.params.id
    //         }
    //     })
    //     .then(comment => res.status(200).json(comment))
    //     .catch(err => res.json({
    //         error: err
    //     }))
    // })

    // router.get('/:id', (req, res) => { // validateSession, 
    //     db.arts.findOne({
    //         where: {
    //             id: req.params.id
    //         }
    //     })
    //     .then(comment => res.status(200).json(comment))
    //     .catch(err => res.json({
    //         error: err
    //     }))
    // })

    // router.get('/id', (req, res) => {
    //     db.arts.findOne({
    //         where: {
    //             id: req.params.id},
    //       include: [
    //         {
    //           model: db.comments,
    //         }
    //       ]
    //     }).then(art => res.status(200).json(art))
    //     .catch(err => res.status(500).json({
    //         error: err
    //     }))
    // })

    router.get('/:id', (req, res) => {
        db.arts.findAll({
            where: { id: req.params.id },
          include: [
            {
              model: db.comments,
            }
          ]
        }).then(art => res.status(200).json(art))
        .catch(err => res.status(500).json({
            error: err
        }))
    })
    
    router.delete('/:id', validateSession, (req, res) => {
        db.arts.destroy( {
            where: {
                id: req.params.id
            }
    })
    .then(art => res.status(200).json(art))
    .catch(err => res.json({
        error: err
    }))
})


module.exports = router;