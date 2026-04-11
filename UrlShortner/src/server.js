const express = require('express');
const app = express();
const port = 3000
const sqlite3 = require('sqlite3')
const {open} = require('sqlite')
const path = require('path')
const dbPath = path.join(__dirname,'db.sql')
const fs = require('fs')
app.use(express.json())

const initializeDBAndServer = async () =>{
    try {
        const db = await open({
            driver : sqlite3.Database,
            filename : path.join(__dirname,'urlshortner.db')
        });
        const sql = fs.readFileSync(dbPath,'utf-8')
        await db.exec(sql)
        app.locals.db = db;
        app.listen(port,() =>{
            console.log(`Server Running at http://localhost:${port}/`)
        });
    } catch(e){
        console.log(`DB Error: ${e.message}`)
        process.exit(1)
    }
}
initializeDBAndServer()

const urlRoutes = require('./routes/url.routes')
app.use('/',urlRoutes)

app.get('/',(req,res) =>{
    res.send('Welcome to URL Shortener API')
})

