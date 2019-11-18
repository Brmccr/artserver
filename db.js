const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres'
})


    const db = {};

db.Sequelize = Sequelize
db.sequelize = sequelize
    
    db.arts = require('./models/art')(sequelize, Sequelize);
    db.comments = require('./models/comment')(sequelize, Sequelize);

    db.arts.hasMany(db.comments);
    db.comments.belongsTo(db.arts);

// manga has many reviews
// reviews belong to manga 

// Do a get all on manga - Should see that reviews are associated underneath the manga get
// the reviews will belong to the manga - 
// Manga will have a UUID 


// sequelize.authenticate().then(
//     function() {
//         console.log('Connected to MangaReview postgres database');
//     },
//     function(err){
//         console.log(err);
//     }
// );

module.exports = db;


