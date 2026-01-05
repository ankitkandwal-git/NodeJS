const express = require('express')
const app = express()
const {open} = require('sqlite')
const path = require('path')
const dbPath = path.join(__dirname,'goodreads.db')
const sqlite3 = require('sqlite3')

let db = null;
app.use(express.json())

const bcrypt = require('bcrypt')

const initializeDBAndServer = async () => {
    try{
        db = await open({
            filename : dbPath,
            driver : sqlite3.Database
        })
        app.listen(3000,() =>{
            console.log("Server Running at http://localhost:3000/")
        })
    }catch(e){
        console.log(`DB Error: ${e.message}`)
    }
}
initializeDBAndServer()

// API1 Register user 

app.post('/users/',async (request,response) =>{
    const {username,name,password} = request.body 
    const hashedPassword = await bcrypt.hash(password,10)
    const selectUserQuery = `SELECT * FROM Users WHERE username = '${username}';`    
    const dbUser = await db.get(selectUserQuery)
    if(dbUser === undefined){
        const newUserQuery = `INSERT INTO Users
        (username,password)
        VALUES
        ('${username}','${hashedPassword}');`
        await db.run(newUserQuery)
        response.send("User created successfully")
    }
    else{
        response.status(400)
        response.send("User already exists")
    }
})

// API2 Login user
app.post('/login/',async(request,response) =>{
    const {username,password} = request.body
    const selectUserQuery = `SELECT * FROM Users WHERE username = '${username}';`
    const dbUser = await db.get(selectUserQuery)
    if(dbUser === undefined){
        response.status(400)
        response.send("Invalid user")
    } 
    else{
        const isPasswordMatched = await bcrypt.compare(password,dbUser.password) 
        if(isPasswordMatched === true){
            response.send("Login Success!")
        }else{
            response.status(400);
            response.send("Invalid username or password")
        }
    }
})