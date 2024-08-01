const mysql = require('mysql2/promise');
const { dbConfig } = require('./configsecret');

// Crear la conexión usando los parámetros de dbConfig
const db = mysql.createPool(dbConfig);

module.exports = db;
