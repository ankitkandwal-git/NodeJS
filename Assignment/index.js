const express = require('express')
const app = express()
const {open} = require('sqlite')
const sqlite3 = require('sqlite3')
const path = require('path')
const dbPath = path.join(__dirname, 'twitterClone.db')
app.use(express.json())
let db = null 

const initalizeDBAndServer = async () =>{
    try{
        db = await open({
            filename : dbPath,
            driver : sqlite3.Database
        })
        app.listen(3000, () =>{
            console.log("Server is running at http://localhost:3000/")
        })
    }catch(error){
        console.log(`DB Error: ${error.message}`);
        process.exit(1);
    }
}
initalizeDBAndServer()

// API 1
app.post('/register/',async(request,response) =>{
    const {username,password,name,gender} = request.body;
    const userQuery = `SELECT * FROM user WHERE username = '${username}';`
    const dbUser = await db.get(userQuery);
    if(dbUser === undefined){
        if(password.length<6){
            response.status(400);
            response.send("Password is too short");
        }else{
            const createUserQuery = `INSERT INTO user (username,password,name,gender) 
            VALUES ('${username}','${password}','${name}','${gender}')`;
            await db.run(createUserQuery);
            response.send("User created successfully");
        }
    }else{
        response.status(400);
        response.send("User already exists");
    }
})

// API 2
app.post('/login/',async(request,response) =>{
    const {username,password} = request.body;
    const userQuery = `SELECT * FROM user WHERE username = '${username}';`
    const dbUser = await db.get(userQuery);
    if(dbUser === undefined){
        response.status(400);
        response.send("Invalid user");
    }
    else{
        const hashPassword = await bcrypt.compare(password,dbUser.password);
        if(hashPassword === true){
            response.send("Login success!");

        }else{
            response.status(400);
            response.send("Invalid password");
        }
    }
})