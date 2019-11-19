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

module.exports = db;


