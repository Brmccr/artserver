module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('comment', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false
        },
        art_id: {
            type: DataTypes.UUID,
            allowNull: false
        },
        paragraph: {
            type: DataTypes.STRING,
            allowNull: false
        },
        owner: {
            type: DataTypes.INTEGER,
            allowNull: false
        } 
    })
    return Comment;
}