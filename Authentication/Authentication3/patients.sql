-- Create Patients Table
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

-- Insert Sample Patient Data from AIIMS Delhi
INSERT INTO patients (patient_name, age, gender, contact_number, email, admission_date, medical_condition, room_number, bed_number, status) VALUES
('Rajesh Kumar', 45, 'M', '9876543210', 'rajesh.kumar@email.com', '2025-01-08', 'Cardiac Issue', '101', 'A', 'Active'),
('Priya Singh', 32, 'F', '9876543211', 'priya.singh@email.com', '2025-01-09', 'Respiratory Infection', '102', 'B', 'Active'),
('Amit Patel', 58, 'M', '9876543212', 'amit.patel@email.com', '2025-01-07', 'Diabetes Management', '103', 'C', 'Active'),
('Neha Sharma', 28, 'F', '9876543213', 'neha.sharma@email.com', '2025-01-05', 'Post Surgery Recovery', '104', 'A', 'Active'),
('Vikram Desai', 67, 'M', '9876543214', 'vikram.desai@email.com', '2025-01-06', 'Hypertension', '105', 'B', 'Active'),
('Anjali Verma', 41, 'F', '9876543215', 'anjali.verma@email.com', '2025-01-09', 'Gastrointestinal Issue', '106', 'C', 'Active'),
('Rohit Gupta', 35, 'M', '9876543216', 'rohit.gupta@email.com', '2025-01-04', 'Orthopedic Treatment', '107', 'A', 'Active'),
('Divya Nair', 50, 'F', '9876543217', 'divya.nair@email.com', '2025-01-08', 'Neurological Condition', '108', 'B', 'Active');
