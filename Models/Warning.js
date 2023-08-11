const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const warning = sequelize.define('warning', {
    GuildID: String,
    UserID: String,
    UserTag: String,
    Content: Array
});

module.exports = warning;