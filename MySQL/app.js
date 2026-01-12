import mysql from 'mysql2';

const mydb = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : "pas123"
});

// CREATE DATABASE
mydb.connect((err) => {
    if(!err){
        console.log("Database connected");
        mydb.query("CREATE DATABASE IF NOT EXISTS nodemysql", (err, result) => {
            if(!err){
                console.log("Database created");
            } else {
                console.log("Error creating database:", err);
            }   
        });
    } else {
        console.log("Connection failed:", err);
    }
});

const initializeDatabase = () => {
    try{
        mydb.changeUser({database : 'nodenmysql'}, (err) => {
            if(err) throw err;
            console.log("Using nodenmysql database");
    })
    } catch(err){
        console.log("Error changing database:", err);
    }

}
initializeDatabase();