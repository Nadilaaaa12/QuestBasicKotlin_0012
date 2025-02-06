let mysql = require('mysql');

let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', //ganti pake password mysql klen
    database: 'pam_api'
});

connection.connect(function(err) {
    if(!!err) {
        console.log(err);
    } else {
        console.log('Connected');
    }
});

module.exports = connection;