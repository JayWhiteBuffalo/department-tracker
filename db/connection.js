const mysql = require('mysql2');
//const Connection = require('mysql2/typings/mysql/lib/Connection');


// Connect to database
const connection = mysql.createConnection(
    {
        host: 'localhost',
        // Your MySQL username
        user: 'root',
        //Your MySql password
        password: 'Z?}(3e&x>&)',
        database: 'company'

    }
);

connection.connect(function (err) {
    if (err) throw err;
    console.log('Connected!');
});



module.exports = connection;