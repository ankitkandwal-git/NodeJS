const express = require('express');
const app = express();
const port = 3000
const sqlite3 = require('sqlite3')
const {open} = require('sqlite')
const path = require('path')
const dbPath = path.join(__dirname, 'db.sql')
const fs = require('fs')
app.use(express.json())

const initializeDBAndServer = async () =>{
    try {
        // Use a single DB file at the project root so CLI and app use same file
        const dbFile = path.join(__dirname, '..', 'urlshortner.db')
        const db = await open({
            driver: sqlite3.Database,
            filename: dbFile
        });

        // Run schema SQL (db.sql lives next to this server file)
        const sql = fs.readFileSync(dbPath, 'utf-8')
        await db.exec(sql)

        // Verify table creation and log DB path for debugging
        const tables = await db.all("SELECT name FROM sqlite_master WHERE type='table'")
        console.log('SQLite DB file:', dbFile)
        console.log('Tables in DB:', tables.map(t => t.name))

        app.locals.db = db;
        app.listen(port, () => {
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

