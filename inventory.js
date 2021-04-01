const mysql = require("mysql");
const inquirer = require("inquirer");

let userName = "";
var connection = mysql.createConnection ({
    port: 3306,
    user: "newuser",
    password: "password",
    database: "inventory_ACNH"
});

connection.connect(function (error) {
    if (error) throw error;
    console.log("connected as id " + connection.threadId);
    login();
});

// "login" function
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
        
        // newItem();
        // displayDB()
        viewDB();
        // updateQuantity();
    })
};

// query all items
function displayDB() {
    connection.query("SELECT * FROM trades", function(error, response) {
        if (error) throw (error);
        console.table(response);
    })
    connection.end();
}

// display db based on username
function viewDB() {
    connection.query("SELECT * FROM trades WHERE ?", [{
        creator: userName
    }], (error, results) => {
        console.table(results);
        updateQuantity(results);
        
    })
}

// post new item to db
function newItem() {
    inquirer.prompt([
        {
            type: "input",
            name: "item_name",
            message: "Item Name"
        },
        {
            type: "list",
            name: "category",
            message: "What is the category?",
            choices: ["Clothing", "DIY", "Flooring", "Fossil", "Gullivers", "Rugs"]
        },
        {
            type: "confirm",
            name: "bells",
            message: "Asking for Bells?",
            default: true
        },
        {
            type: "confirm",
            name: "nmt",
            message: "Asking for Nook Miles Tickets?",
            default: true
        },
        {
            type: "confirm",
            name: "sent_taylor",
            message: "Did you send one to Taylor?",
            default: false
        }
    ])
    .then(function(answers) {
        console.log(answers);
        answers.creator = userName;
        let query = connection.query("INSERT INTO trades SET ?", answers, (error, response) => {
            console.log(query.sql);
            displayDB();
            // connection.end();
        })
        
    })
};

// update quantity of item listing
function updateQuantity(results) {
    // connection.query("SELECT * FROM trades WHERE?", [{
    //     creator: userName
    // }], (error, results) => {
        inquirer.prompt([{
            name: "itemName",
            message: "Which item do you want to edit?",
            type: "list",
            choices: results.map(trades => trades.item_name)
        }])
        .then(answers => {
            console.log(answers)
            let itemToEdit = results.find(trades => trades.item_name == answers.itemName);
            inquirer.prompt([{
                type: "input",
                name: "invt_quantity",
                message: `Update Inventory Quantity: (${itemToEdit.invt_quantity})`
            }])
        })
    }
    // )}





