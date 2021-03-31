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
    login();
});

function login() {
    inquirer.prompt([{
            name: "userName",
            message: "User name"
        },
        {
            name: "password",
            message: "Password",
            type: "password"
        }
    ])
    .then(answers => {
        userName = answers.userName;
        console.log(userName);
    })
};

