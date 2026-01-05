
-- Create Users table
CREATE TABLE IF NOT EXISTS Users (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	username TEXT NOT NULL UNIQUE,
	password TEXT NOT NULL
);

-- Insert sample users
INSERT INTO Users (username, password) VALUES ('alice', 'password123');
INSERT INTO Users (username, password) VALUES ('bob', 'securepass');
INSERT INTO Users (username, password) VALUES ('charlie', 'charliepwd');
