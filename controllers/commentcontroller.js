let express = require('express');
let router = express.Router();
let db = require('../db');
const validateSession = require('../middleware/validate-session');
// let User = db.sequelize.import('../models/user');



router.post('/commentpost', validateSession, function(req, res){  
    const artCommentFromRequest = {
        paragraph: req.body.paragraph,
        owner: req.user.id,
        art_id: "40ae132d-8c48-46ff-aeb7-f1581dc4cd2e"
    }

    console.log(artCommentFromRequest)
    
        db.comments.create(artCommentFromRequest)
            .then(comment => res.status(200).json(comment))
            .catch(err => res.json(err.message));
    })


    router.put('/:id', validateSession, (req, res) => { // validateSession, 
        db.comments.update(req.body, {
            where: {
                id: req.params.id
            }
        })
        .then(comment => res.status(200).json(comment))
        .catch(err => res.json({
            error: err
        }))
    })
    // validateSession,
    
    router.delete('/:id', (req, res) => { /// validateSession, to be added back in 
        db.comments.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(comment => res.status(200).json(comment))
        .catch(err => res.json({
            error: err
        }))
    })

    router.get('/allartcomments', (req, res) => {
        db.arts.findAll({
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

    router.get('/comments', validateSession, function(req, res) {
        let user = req.user.id;
    
        db.comments
        .findAll({
            where: {owner: user }
        })
        .then(
            function findAllSuccess(data) {
                res.json(data);
            },
            function findAllError(err) {
                res.send(500, err.message);
            }
        );
    });

    router.get('/commentsonart', (req, res) => {
        db.arts.findAll({
            where: {title : "Facing"},
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

    module.exports = router;