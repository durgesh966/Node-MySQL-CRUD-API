const mysql = require('mysql');

const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "bhopal",
    insecureAuth: true
});

conn.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Connection established");
    }
});
module.exports = conn;
