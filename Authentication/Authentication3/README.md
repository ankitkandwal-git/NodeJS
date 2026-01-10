# Patient Management API with Authentication & Authorization

## Overview
This is a secure RESTful API for managing AIIMS Delhi patient records with JWT-based authentication and role-based authorization.

## Database
- **Database Type**: SQLite3
- **File**: `patients.db` (created automatically on first run)

### Tables:
1. **patients** - Stores patient information
2. **users** - Stores user credentials and roles

## Default Credentials
```
Admin:  username: admin,  password: admin123
Staff:  username: staff1, password: staff123
```

## Features
- ✅ JWT Token-based Authentication
- ✅ Role-based Authorization (Admin & Staff)
- ✅ CRUD Operations on Patient Records
- ✅ Admin-only actions (Create, Update, Delete)
- ✅ Staff can view patient records

## API Endpoints

### 1. Authentication
**POST** `/login`
- Login with credentials to get JWT token
- Required fields: `username`, `password`
- Response: JWT token with 24-hour expiry

### 2. Get All Patients
**GET** `/patients`
- Requires: Authentication + (Admin or Staff role)
- Returns: List of all patients

### 3. Get Patient by ID
**GET** `/patients/:id`
- Requires: Authentication + (Admin or Staff role)
- Returns: Single patient details

### 4. Add New Patient
**POST** `/patients`
- Requires: Admin role
- Required fields: `patient_name`, `age`, `gender`
- Optional fields: `contact_number`, `email`, `admission_date`, `medical_condition`, `room_number`, `bed_number`

### 5. Update Patient
**PUT** `/patients/:id`
- Requires: Admin role
- Fields can be partially updated

### 6. Delete Patient
**DELETE** `/patients/:id`
- Requires: Admin role
- Removes patient from database

## How to Use

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Start Server
```bash
node app.js
```
The server will run on `http://localhost:3000`

### Step 3: Login and Get Token
```bash
curl -X POST http://localhost:3000/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'
```

Response will include a JWT token.

### Step 4: Use Token in Requests
```bash
curl -X GET http://localhost:3000/patients \
  -H "Authorization: Bearer <your_token_here>"
```

## Patient Data Sample
The system includes 8 sample AIIMS Delhi patient records:
- Rajesh Kumar (Cardiac Issue)
- Priya Singh (Respiratory Infection)
- Amit Patel (Diabetes Management)
- Neha Sharma (Post Surgery Recovery)
- Vikram Desai (Hypertension)
- Anjali Verma (Gastrointestinal Issue)
- Rohit Gupta (Orthopedic Treatment)
- Divya Nair (Neurological Condition)

## Error Handling
- `401 Unauthorized`: Missing or invalid token
- `403 Forbidden`: Invalid role for the action
- `404 Not Found`: Patient record not found
- `400 Bad Request`: Missing required fields
- `500 Internal Server Error`: Database error

## Security Features
- JWT tokens expire after 24 hours
- Password stored (in production, use bcrypt)
- Role-based access control
- Only authenticated users can view data
