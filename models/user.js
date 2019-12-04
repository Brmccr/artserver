  
module.exports = function(sequelize, DataTypes) {

    return sequelize.define('user', {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        passwordhash: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        displayname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        firstname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.ENUM,
            values: ['user', 'admin']
        },
        updated_at:  DataTypes.DATE,
          deleted_at: DataTypes.DATE
        }, {
          underscored: true
        });

};