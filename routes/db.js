const mariadb = require('mariadb');

// Connexion à la base de données
const pool = mariadb.createPool(
    {
        host: 'localhost',
        user: 'admin',
        password: 'admin',
        database: 'free_muslim',
        connectionLimit: 5
    }
);

// On exporte le pool
module.exports = pool;