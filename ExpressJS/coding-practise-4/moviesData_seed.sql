-- Create director table
DROP TABLE IF EXISTS movies;
DROP TABLE IF EXISTS director;yes
CREATE TABLE IF NOT EXISTS director (
    director_id INTEGER PRIMARY KEY AUTOINCREMENT,
    director_name TEXT NOT NULL
);

-- Create movies table
CREATE TABLE IF NOT EXISTS movies (
    movie_id INTEGER PRIMARY KEY AUTOINCREMENT,
    director_id INTEGER,
    movie_name TEXT NOT NULL,
    lead_actor TEXT,
    FOREIGN KEY (director_id) REFERENCES director(director_id)
);

-- Insert sample directors
INSERT INTO director (director_name) VALUES
('Christopher Nolan'),
('Rajkumar Hirani'),
('Quentin Tarantino'),
('Steven Spielberg'),
('Ashutosh Gowariker'),
('Martin Scorsese'),
('James Cameron'),
('Sanjay Leela Bhansali'),
('David Fincher'),
('Francis Ford Coppola');

-- Insert sample movies
INSERT INTO movies (director_id, movie_name, lead_actor) VALUES
(1, 'Inception', 'Leonardo DiCaprio'),
(1, 'Interstellar', 'Matthew McConaughey'),
(1, 'The Dark Knight', 'Christian Bale'),
(2, '3 Idiots', 'Aamir Khan'),
(2, 'PK', 'Aamir Khan'),
(2, 'Munna Bhai M.B.B.S.', 'Sanjay Dutt'),
(3, 'Pulp Fiction', 'John Travolta'),
(3, 'Django Unchained', 'Jamie Foxx'),
(4, 'Jurassic Park', 'Sam Neill'),
(4, 'E.T. the Extra-Terrestrial', 'Henry Thomas'),
(5, 'Lagaan', 'Aamir Khan'),
(5, 'Swades', 'Shah Rukh Khan'),
(6, 'The Wolf of Wall Street', 'Leonardo DiCaprio'),
(6, 'Goodfellas', 'Ray Liotta'),
(7, 'Avatar', 'Sam Worthington'),
(7, 'Titanic', 'Leonardo DiCaprio'),
(8, 'Black', 'Amitabh Bachchan'),
(8, 'Devdas', 'Shah Rukh Khan'),
(9, 'Fight Club', 'Brad Pitt'),
(9, 'Gone Girl', 'Ben Affleck'),
(10, 'The Godfather', 'Marlon Brando'),
(10, 'The Godfather: Part II', 'Al Pacino');

-- Create director table
CREATE TABLE IF NOT EXISTS director (
    director_id INTEGER PRIMARY KEY AUTOINCREMENT,
    director_name TEXT NOT NULL
);

-- Insert sample directors
INSERT INTO director (director_name) VALUES
('Christopher Nolan'),
('Rajkumar Hirani'),
('Quentin Tarantino'),
('Steven Spielberg'),
('Ashutosh Gowariker'),
('Martin Scorsese'),
('James Cameron'),
('Sanjay Leela Bhansali'),
('David Fincher'),
('Francis Ford Coppola');

DROP TABLE IF EXISTS movies;
DROP TABLE IF EXISTS director;

-- Create director table
CREATE TABLE IF NOT EXISTS director (
    director_id INTEGER PRIMARY KEY AUTOINCREMENT,
    director_name TEXT NOT NULL
);

-- Create movies table
CREATE TABLE IF NOT EXISTS movies (
    movie_id INTEGER PRIMARY KEY AUTOINCREMENT,
    director_id INTEGER,
    movie_name TEXT NOT NULL,
    lead_actor TEXT,
    FOREIGN KEY (director_id) REFERENCES director(director_id)
);

-- ...rest of your inserts...