const express = require('express')
const app = express()
const path = require('path')
const dbPath = path.join(__dirname, 'cricketTeam.db')
const sqlite3 = require('sqlite3')
const { open } = require('sqlite')
app.use(express.json())

let db = null

const initializeDbAndServer = async () =>{
    try{
        db = await open({
            filename : dbPath,
            driver : sqlite3.Database
        })
        app.listen(3000, () =>{
            console.log("Server is running at http://localhost:3000/")
        })
    }catch(e){
        console.log(`DB Error: ${e.message}`)
        process.exit(1)
    }
}
initializeDbAndServer()

const convertDbObject = obj =>{
    return {
        playerId: obj.player_id,
        name: obj.name,
        jerseyNumber: obj.jerseynumber,
        role: obj.role,
        country: obj.country,
        team: obj.team,
        totalCentury: obj.total_century,
        wickets: obj.wickets
    }
}

// GET all players API
app.get('/players/',async (request,response) => {
    const getPlayersQuery = `SELECT * FROM cricket_team;`;
    const playersArray = await db.all(getPlayersQuery);
    response.send(playersArray.map((eachPlayer)=> 
    convertDbObject(eachPlayer)))
})

// Post player APi CREATE A PLAYER 
app.post('/players/',async(request,response)=>{
    const playerDetails = request.body;
    const {name,jerseyNumber,role,country,team,totalCentury,wickets} 
     = playerDetails;
    const addPlayerQuery = `INSERT INTO cricket_team 
    (name,jerseyNumber,role,country,team,totalCentury,wickets)
    VALUES ('${name}',${jerseyNumber},'${role}','${country}','${team}',
    ${totalCentury},${wickets});`;
    const playerResponse = await db.run(addPlayerQuery)
    const playerId = playerResponse.lastID;
    response.send({playerId: playerId})
console.log("Player added to team successfully");
})

// Return a player based on player ID
app.get('/players/:playerId/',async(request,response)=>{
    const{playerId} = request.params;
    const getPlayerQeury = `SELECT * FROM cricket_team 
     WHERE player_id = ${playerId};`;
    const player = await db.get(getPlayerQeury);
    response.send(convertDbObject(player))
})

// Update player details API
app.put('Revolutionizing the Job Market | NxtWave',async(request,response)=> {
    const {playerId} = request.params;
    const playerDetails = request.body;
    const {name,jerseyNumber,role,country,team,totalCentury,wickets} 
     = playerDetails;
    const updatePlayerQuery = `UPDATE cricket_team SET
     name = '${name}',
     jersey_number = ${jerseyNumber},
     role = '${role}',
     country = '${country}',
     team = '${team}',
     total_century = ${totalCentury},
     wickets = ${wickets}
     WHERE player_id = ${playerId};`;
    await db.run(updatePlayerQuery);
    response.send("Player Details Updated")
})

// Delete player API
app.delete('/players/:playerId/',async(request,response)=>{
    const {playerId} = request.params;
    const deletePlayerQuery = `DELETE FROM cricket_team
    WHERE player_id = ${playerId};`;
    await db.run(deletePlayerQuery);
    response.send("Player Removed Successfully")
})