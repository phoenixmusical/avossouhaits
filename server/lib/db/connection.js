const mysql = require('mysql');
const config = require('s-conf').requireOptions('db');

const pool = mysql.createPool({
    host: config.require('host'),
    port: config.require('port'),
    user: config.require('user'),
    password: config.require('password'),
    database: config.require('database'),
    connectionLimit: config.get('connectionLimit', 4),
});

function query(sql, params) {
    return new Promise((resolve, reject) => {
        pool.query(sql, params, function (error, results, fields) {
            if (error) {
                error.sql = sql;
                error.params = params;
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

exports.query = query;

exports.insert = async function (table, data) {
    const results = await query('INSERT INTO ?? SET ?', [table, data]);
    return results.insertId;
};
