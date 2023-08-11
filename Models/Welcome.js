const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Welcome = sequelize.define('Welcome', {
  Guild: String,
    Channel: String,
    Msg: String,
    Role: String
});

module.exports = Welcome
// ("Welcome", welcomeSchema);