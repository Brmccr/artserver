let express = require('express');
let router = express.Router();
let db = require('../db');
let jwt = require('jsonwebtoken');
let bcrypt = require('bcryptjs');
// let User = db.import('../models/user');
const validateSession = require('../middleware/validate-session');
// const manga = require('../db').import('../models/manga');
// const review = require('../db').import('../models/review');
// let ReviewModel = sequelize.import('../models/review');
let User = db.sequelize.import('../models/user');





router.get('/', function(req, res) {
    res.send('Hey!! This is a test route!');
})

// add validatation to user creation here -- 
// router.post('/user/', function(req, res) {

//     let username = req.body.user.username;
//     let pass = req.body.user.password;

//     User.create({
//         username: username,
//         passwordhash: bcrypt.hashSync(pass, 10),
//         displayname: req.body.user.displayname,
//         firstname: req.body.user.firstname,
//         lastname: req.body.user.lastname

//     }).then(
//         function createSuccess(user){

//         let token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn :60*60*24});
            
//             res.json({
//                 user: user,
//                 message: 'created',
//                 sessionToken: token
//             });
//         },
//         function createError(err) {
//             res.send(500, err.message);
//         }
//     );
// });


// router.post('/login', function(req, res) {

//     User.findOne( { where: { username: req.body.user.username } } ).then(

//         function(user){
//             if (user) {
                
//                 bcrypt.compare(req.body.user.password, user.passwordhash, function(err, matches){
                
//                     if(matches) {
//                         let token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24});
//                         res.json({
//                             user: user,
//                             message: "successfully authenticated",
//                             sessionToken: token
//                 });
//                     }else { 
//                         res.status(502).send({ error: "Sign In Error"});
//                     }
//                 });  
//             } else {
//                 res.status(500).send({ error : "Failed to authenticate"});
//             }
//         },
//         function(err) {
//             res.status(501).send({error: "Login Error"});
//         }
//     );
// });

// router.put('/:id', validateSession, (req, res) => { // validateSession, 
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


// router.delete('/:id', validateSession, (req, res) => { /// validateSession, to be added back in 
//     db.comments.destroy({
//         where: {
//             id: req.params.id
//         }
//     })
//     .then(comment => res.status(200).json(comment))
//     .catch(err => res.json({
//         error: err
//     }))
// })

// router.post('/commentpost', validateSession, function(req, res){
//     const artCommentFromRequest = {
//         paragraph: req.body.paragraph,
//         owner: req.user.id,
//         art_id: "be765c66-61d5-4666-8ed2-3948cca2d756"
//     }

//     console.log(artCommentFromRequest)
    
//         db.comments.create(artCommentFromRequest)
//             .then(comment => res.status(200).json(comment))
//             .catch(err => res.json(req.errors));
//     })

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

    // router.get('/allartcomments', (req, res) => {
    //     db.arts.findAll({
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

    // router.get('/comments', validateSession, function(req, res) {
    //     let user = req.user.id;
    
    //     db.comments
    //     .findAll({
    //         where: {owner: user }
    //     })
    //     .then(
    //         function findAllSuccess(data) {
    //             res.json(data);
    //         },
    //         function findAllError(err) {
    //             res.send(500, err.message);
    //         }
    //     );
    // });

module.exports = router;