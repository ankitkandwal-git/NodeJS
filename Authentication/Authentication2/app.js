const express = require('express');
const app = express();
const {open} = require('sqlite');
const sqlite3 = require('sqlite3');
const bcrypt = require('bcrypt')
const path = require('path')
const dbPath = path.join(__dirname,'goodreads.db')
app.use(express.json())

const initializeDBAndServer = async () => {
    try{
        db = await open({
            filename : dbPath,
            driver : sqlite3.Database
        })
        app.listen(3000,() =>{
            console.log(`Sever Running at http://localhost:3000/`)
        })
    }catch(e){
        console.log(`DB Error: ${e.message}`);
        process.exit(1);
    }
}
initializeDBAndServer()

// API 1 Register User

app.post('/users/',async(request,response) =>{
    let jwtToken = null;
    const authHeader = request.headers["authorization"];
    if(authHeader !== undefined){
        jwtToken = authHeader.split(" ")[1];
    }
    const {username,password} = request.body;
    const hashedPassword = await bcrypt.hash(password,10)
    const selectUserQuery = `SELECT * FROM user WHERE username = '${username}';`;
    const dbUser = await db.get(selectUserQuery)
    if(dbUser === undefined){
        const createUserQuery = `INSERT INTO user (username,password)
        VALUES ('${username}','${hashedPassword}');`
        await db.run(createUserQuery)
        response.send("User created successfully")
    } else {
        response.status(400).send("User already exists")
    }
})
 
// AP1 2 Login User
app.post('/login/',async(request,response) =>{
    const {username,password} = request.body;
    const selectUserQuery = `SELECT * FROM user WHERE username = '${username}';`;
    const dbUser = await db.get(selectUserQuery);
    if(dbUser === undefined){
        response.status(400).send("Invalid user")
    }
    else{
        const isPasswordMatched = await bcrypt.compare(password,dbUser.password)
        if(isPasswordMatched === true){
            response.send("Login Success!")
        }else{
            response.status(400).send("Invalid Password")
        }
    }
})