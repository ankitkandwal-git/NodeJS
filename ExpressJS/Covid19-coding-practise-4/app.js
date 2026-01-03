const express = require('express')
const app = express()
const path = require('path')
const dbPath = path.join(__dirname, 'covid19India.db')
const {open} = require('sqlite')
const sqlite3 = require('sqlite3')
app.use(express.json())
let db = null

const inittializeDbAndServer = async() => {
    try{
        db = await open({
            filename : dbPath,
            driver : sqlite3.Database
        })
        app.listen(3000, () => {
            console.log("Server is running at http://localhost:3000/")
        })
    }catch(e){
        console.log(`DB Error : ${e.message}`)
        process.exit(1)
    }
}
inittializeDbAndServer()

const convertStateDbObject = obj => {
    return{
        stateId : obj.state_id,
        stateName : obj.state_name,
        population : obj.population
    }
}

const convertDistrictObject = obj => {
    return{
        districtId : obj.district_id,
        districtName : obj.district_name,
        stateId : obj.state_id,
        cases : obj.cases,
        cured : obj.cured,
        active : obj.active,
        deaths : obj.deaths
    }
}
// API 1 Returns a list of all states in the state table

app.get('/states/',async (request,response) => {
    const getStatesQuery = `SELECT * FROM state;`;
    const statesArray = await db.all(getStatesQuery);
    response.send(statesArray.map((eachState)=> convertStateDbObject(eachState)))
})


// API 2 Returns a state based on the state ID
app.get('/states/:stateId/',async(request,response) =>{
    const {stateId} = request.params;
    const getStateQuery = `SELECT * FROM state WHERE state_id = ${stateId};`;
    const stateResponse = await db.get(getStateQuery);
    response.send(convertStateDbObject(stateResponse))
})

// API 3 Create a district in the district table, district_id is auto-incremented
app.post('/districts/',async(request,response) => {
    const districtDetails = request.body;
    const {districtName,stateId,cases,cured,active,deaths} = districtDetails;
    const postDistrictQuery = `INSERT INTO district (district_name,state_id,cases,cured,active,deaths)
    VALUES ('${districtName}',${stateId},${cases},${cured},${active},${deaths});`;
    const dbResponse = await db.run(postDistrictQuery);
    const districtId = dbResponse.lastID;
    response.send({districtId: districtId})
    response.send("District Successfully Added")
})

//API 4 Returns a district based on the district ID
app.get('/districts/:districtId',async(request,response) => {
    const {districtId} = request.params;
    const getDistrictQuery = `SELECT * FROM district WHERE district_id = ${districtId};`;
    const districtResponse = await db.get(getDistrictQuery);
    response.send(convertDistrictObject(districtResponse))
}) 

// API 5 Deletes a district from the district table based on the district ID 
app.delete('/districts/:districtId/',async(request,response) =>{
    const {districtId} = request.params;
    const deleteDistrict = `DELETE FROM district WHERE district_id = ${districtId};`;
    await db.run(deleteDistrict);
    response.send("District Removed")
})

// API 6 Updates the details of a specific district based on the district ID
app.put('/districts/:districtId/',async(request,response) =>{
    const {districtId} = request.params;
    const districtDetails = request.body;
    const {districtName,stateId,cases,cured,active,deaths} = districtDetails;
    const updateDistrictQuery = `UPDATE district SET 
    district_name = '${districtName}',
    state_id = ${stateId},
    cases = ${cases},
    cured = ${cured},
    active = ${active},
    deaths = ${deaths}
    WHERE district_id = ${districtId};`;
    await db.run(updateDistrictQuery);
    response.send("District Details Updated")
})

// API 7 Returns the statistics of total cases, cured, active and deaths of a specific state based on state ID
app.get('/states/:stateId/stats/',async(request,response) =>{
    const {stateId} = request.params;
    const getStatesQuery = `SELECT SUM(cases) AS totalCass SUM(cured) 
    AS totalCured, SUM(active) AS totalActive, SUM(deaths) AS totalDeaths 
    FROM district WHERE state_id = ${stateId};`;
    const statsResponse = await db.get(getStatesQuery);
    response.send(statsResponse)
})