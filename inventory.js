const mysql = require("mysql");
const inquirer = require("inquirer");

let userName = "";
var connection = mysql.createConnection ({
    port: 3306,
    user: "newuser",
    password: "password",
    database: "bay_db"
});

connection.connect(function (error) {
    if (error) throw error;
    console.log("connected as id " + connection.threadId);
});

