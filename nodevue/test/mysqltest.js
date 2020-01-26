const mysql = require('mysql');
const util = require('util');

const connection = mysql.createConnection({
    host    :   'localhost',
    user    :   'root',
    password:   'secret',
    database:   'wdj6',
});

connection.connect();
util.log('> connect');

connection.query('select * from users', function (error, results, fields){
    if (error) {
        console.log(error);
    }
    console.log(results);
});

connection.end();
util.log('> end');
