const express = require('express')
const app = express()
app.use(express.json())
const port = 3000;
const {open } = require('sqlite')
const sqlite3 = require('sqlite3')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
let db = null

const SECRET_KEY = 'your_secret_key'; // Change this in production

// JWT authentication middleware
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(401).json({ error: 'Token required' });
    const token = authHeader.split(' ')[1];
    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.status(403).json({ error: 'Invalid token' });
        req.user = user;
        next();
    });
}

const inittializeDBAndSetupServer = async () =>{
    try{
        db = await open({
            filename : 'patients.db',
            driver : sqlite3.Database
        })
        
        // Create patients table if it doesn't exist
        await db.exec(`
            CREATE TABLE IF NOT EXISTS patients (
                patient_id INTEGER PRIMARY KEY AUTOINCREMENT,
                patient_name VARCHAR(100) NOT NULL,
                age INTEGER,
                gender VARCHAR(10),
                contact_number VARCHAR(15),
                email VARCHAR(100),
                admission_date DATE,
                medical_condition VARCHAR(200),
                room_number VARCHAR(10),
                bed_number VARCHAR(10),
                status VARCHAR(20) DEFAULT 'Active'
            );
        `);
        
        // Insert sample data if table is empty
        const count = await db.get('SELECT COUNT(*) as count FROM patients');
        if (count.count === 0) {
            await db.exec(`
                INSERT INTO patients (patient_name, age, gender, contact_number, email, admission_date, medical_condition, room_number, bed_number, status) VALUES
                ('Rajesh Kumar', 45, 'M', '9876543210', 'rajesh.kumar@email.com', '2025-01-08', 'Cardiac Issue', '101', 'A', 'Active'),
                ('Priya Singh', 32, 'F', '9876543211', 'priya.singh@email.com', '2025-01-09', 'Respiratory Infection', '102', 'B', 'Active'),
                ('Amit Patel', 58, 'M', '9876543212', 'amit.patel@email.com', '2025-01-07', 'Diabetes Management', '103', 'C', 'Active'),
                ('Neha Sharma', 28, 'F', '9876543213', 'neha.sharma@email.com', '2025-01-05', 'Post Surgery Recovery', '104', 'A', 'Active');
            `);
        }
        
        app.listen(port , () =>{
            console.log(`Server is running at http://localhost:3000`)
            
        })
    }catch(e){
        console.log(`DB Error : ${e.message}`)
        process.exit(1)
    }
}

inittializeDBAndSetupServer()

app.get('/patients/', authenticateToken, async (request,response) =>{
    const getPatientsQuery = `SELECT * FROM patients;`;
    const patientsArray = await db.all(getPatientsQuery);
    response.send(patientsArray);
});

app.get('/patients/:patientId/', authenticateToken, async(request,response) =>{
    const {patientId} = request.params;
    const getPatientDetails = `SELECT * FROM patients WHERE patient_id = ${patientId};`;
    const patientsDetailsResponse = await db.get(getPatientDetails);
    response.send(patientsDetailsResponse);
})

app.post('/patients/', authenticateToken, async(request,response) =>{
    const patientDetails = request.body;
    const {
        patient_name,
        age,
        gender,
        contact_number,
        email,
        admission_date,
        medical_condition,
        room_number,
        bed_number,
        status
    } = patientDetails;
    const addPatientQuery = `
        INSERT INTO patients (patient_name, age, gender, contact_number, email, admission_date, medical_condition, room_number, bed_number, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    `;
    await db.run(addPatientQuery, [patient_name, age, gender, contact_number, email, admission_date, medical_condition, room_number, bed_number, status]);
    response.send({ message: 'Patient added successfully' });
})

app.put('/patients/:patientId/',async(request,response) =>{
    const {patientId} = request.params; 
    const patientDetails = request.body;
    const {
        patient_name,
        age,    
        gender,
        contact_number,
        email,
        admission_date,
        medical_condition,
        room_number,
        bed_number,
        status
    } = patientDetails;
    const updatePatientQuery = `UPDATE patients 
    SET 
        patient_name = '${patient_name}',
        age = ${age},
        gender = '${gender}',
        contact_number = '${contact_number}',
        email = '${email}', 
        admission_date = '${admission_date}',
        medical_condition = '${medical_condition}',
        room_number = '${room_number}',
        bed_number = '${bed_number}',
        status = '${status}'
    WHERE 
        patient_id = ${patientId};`;
    await db.run(updatePatientQuery);
    response.send("Patient Details Updated");
})

app.delete('/patients/:patientId/',async(request,response) =>{
    const {patientId} = request.params;
    const deletePatientQuery = `DELETE FROM patients WHERE patient_id = ${patientId};`;
    await db.run(deletePatientQuery);
    response.send("Patient Removed");
})

// API Register user or admin or staff 
app.post('/register/',async(request,response) =>{
    const {username,password,role} = request.body;
    const hashedPassword = await bcrypt.hash(password,10);
    const selectUserQuery = `SELECT * FROM users WHERE username = '${username}';`;
    const dbUser = await db.get(selectUserQuery);
    if(dbUser === undefined){
        const createNewUser = `INSERT INTO users (username,password,role)
        VALUES ('${username}','${hashedPassword}','${role}');`;
        await db.run(createNewUser);
        response.send("User created successfully");
    }else{
        response.status(400).send("User already exists");
    }
})

// API Login user or admin or staff
app.post('/login/',async(request,response) =>{
    const {username,password} = request.body;
    const selectUserQuery = `SELECT * FROM users WHERE username = '${username}';`;
    const dbUser = await db.get(selectUserQuery);
    if(dbUser === undefined){
        response.status(400).send("Invalid user");
    }else{
        const isPasswordMatched = await bcrypt.compare(password,dbUser.password);
        if(isPasswordMatched === true){
            response.send("Login Successful")
        }else{
            response.status(400).send("Invalid password")
        }
    }
})

// Login route to issue JWT token
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password required' });
    }
    const user = await db.get('SELECT * FROM users WHERE username = ?', username);
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ username: user.username, role: user.role }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
});