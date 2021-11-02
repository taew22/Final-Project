module.exports = ( sequelize, DataTypes ) => {
    const Garden = sequelize.define('Garden', {
        title: DataTypes.STRING,
        thumbnail: DataTypes.STRING,
        pictures: DataTypes.STRING,
        content: DataTypes.TEXT,
        category: DataTypes.STRING,
        status: DataTypes.STRING,
    })
    return Garden
}