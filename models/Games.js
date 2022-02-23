const { DataTypes } = require('sequelize')
const db = require('../db/conn')

const Games = db.define('Games', {
    name: {
         type: DataTypes.STRING,
         allowNull: false,
    },
    year: {
        type: DataTypes.INTEGER,
        required: true,
    },
    category: {
        type: DataTypes.STRING,
    },
})

module.exports = Games;