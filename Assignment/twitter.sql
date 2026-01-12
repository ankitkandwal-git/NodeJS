CREATE TABLE user (
	user_id INTEGER PRIMARY KEY AUTOINCREMENT,
	name TEXT NOT NULL,
	username TEXT UNIQUE NOT NULL,
	password TEXT NOT NULL,
	gender TEXT
);

CREATE TABLE follower (
	follower_id INTEGER PRIMARY KEY AUTOINCREMENT,
	follower_user_id INTEGER NOT NULL,
	following_user_id INTEGER NOT NULL,
	FOREIGN KEY (follower_user_id) REFERENCES user(user_id),
	FOREIGN KEY (following_user_id) REFERENCES user(user_id)
);

CREATE TABLE tweet (
	tweet_id INTEGER PRIMARY KEY AUTOINCREMENT,
	tweet TEXT NOT NULL,
	user_id INTEGER NOT NULL,
	date_time DATETIME DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (user_id) REFERENCES user(user_id)
);

CREATE TABLE reply (
	reply_id INTEGER PRIMARY KEY AUTOINCREMENT,
	tweet_id INTEGER NOT NULL,
	reply TEXT NOT NULL,
	user_id INTEGER NOT NULL,
	date_time DATETIME DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (tweet_id) REFERENCES tweet(tweet_id),
	FOREIGN KEY (user_id) REFERENCES user(user_id)
);

CREATE TABLE like (
	like_id INTEGER PRIMARY KEY AUTOINCREMENT,
	tweet_id INTEGER NOT NULL,
	user_id INTEGER NOT NULL,
	date_time DATETIME DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (tweet_id) REFERENCES tweet(tweet_id),
	FOREIGN KEY (user_id) REFERENCES user(user_id)
);

-- Insert 30 users
INSERT INTO user (name, username, password, gender) VALUES
('Alice Smith', 'alice1', 'pass1', 'Female'),
('Bob Johnson', 'bobbyj', 'pass2', 'Male'),
('Carol White', 'carolw', 'pass3', 'Female'),
('David Brown', 'davidb', 'pass4', 'Male'),
('Eve Black', 'eveb', 'pass5', 'Female'),
('Frank Green', 'frankg', 'pass6', 'Male'),
('Grace Lee', 'gracel', 'pass7', 'Female'),
('Henry King', 'henryk', 'pass8', 'Male'),
('Ivy Scott', 'ivys', 'pass9', 'Female'),
('Jack Hill', 'jackh', 'pass10', 'Male'),
('Kathy Adams', 'kathya', 'pass11', 'Female'),
('Leo Clark', 'leoc', 'pass12', 'Male'),
('Mona Lewis', 'monal', 'pass13', 'Female'),
('Nate Young', 'natey', 'pass14', 'Male'),
('Olivia Hall', 'oliviah', 'pass15', 'Female'),
('Paul Allen', 'paula', 'pass16', 'Male'),
('Quinn Wright', 'quinnw', 'pass17', 'Other'),
('Rita Baker', 'ritab', 'pass18', 'Female'),
('Sam Turner', 'samt', 'pass19', 'Male'),
('Tina Harris', 'tinah', 'pass20', 'Female'),
('Uma Nelson', 'uman', 'pass21', 'Female'),
('Vince Carter', 'vincec', 'pass22', 'Male'),
('Wendy Evans', 'wendye', 'pass23', 'Female'),
('Xander Moore', 'xanderm', 'pass24', 'Male'),
('Yara Perez', 'yarap', 'pass25', 'Female'),
('Zane Reed', 'zaner', 'pass26', 'Male'),
('Amy Fox', 'amyf', 'pass27', 'Female'),
('Ben Grant', 'beng', 'pass28', 'Male'),
('Cindy Ross', 'cindyr', 'pass29', 'Female'),
('Derek Stone', 'dereks', 'pass30', 'Male');

-- Insert 30 followers (user 1-15 follow user 16-30)
INSERT INTO follower (follower_user_id, following_user_id) VALUES
(1, 16), (2, 17), (3, 18), (4, 19), (5, 20),
(6, 21), (7, 22), (8, 23), (9, 24), (10, 25),
(11, 26), (12, 27), (13, 28), (14, 29), (15, 30),
(16, 1), (17, 2), (18, 3), (19, 4), (20, 5),
(21, 6), (22, 7), (23, 8), (24, 9), (25, 10),
(26, 11), (27, 12), (28, 13), (29, 14), (30, 15);

-- Insert 30 tweets (one per user)
INSERT INTO tweet (tweet, user_id, date_time) VALUES
('Hello world!', 1, '2026-01-01 10:00:00'),
('Good morning!', 2, '2026-01-01 10:05:00'),
('Having coffee.', 3, '2026-01-01 10:10:00'),
('Working on a project.', 4, '2026-01-01 10:15:00'),
('Lunch time!', 5, '2026-01-01 10:20:00'),
('Reading a book.', 6, '2026-01-01 10:25:00'),
('Going for a walk.', 7, '2026-01-01 10:30:00'),
('Watching a movie.', 8, '2026-01-01 10:35:00'),
('Listening to music.', 9, '2026-01-01 10:40:00'),
('Studying SQL.', 10, '2026-01-01 10:45:00'),
('Coding in Node.js.', 11, '2026-01-01 10:50:00'),
('Trying new recipes.', 12, '2026-01-01 10:55:00'),
('Playing chess.', 13, '2026-01-01 11:00:00'),
('Learning guitar.', 14, '2026-01-01 11:05:00'),
('Exploring nature.', 15, '2026-01-01 11:10:00'),
('Writing a blog.', 16, '2026-01-01 11:15:00'),
('Drawing sketches.', 17, '2026-01-01 11:20:00'),
('Taking photos.', 18, '2026-01-01 11:25:00'),
('Gardening today.', 19, '2026-01-01 11:30:00'),
('Baking cookies.', 20, '2026-01-01 11:35:00'),
('Jogging in park.', 21, '2026-01-01 11:40:00'),
('Shopping online.', 22, '2026-01-01 11:45:00'),
('Watching sports.', 23, '2026-01-01 11:50:00'),
('Learning Spanish.', 24, '2026-01-01 11:55:00'),
('Meditating.', 25, '2026-01-01 12:00:00'),
('Planning a trip.', 26, '2026-01-01 12:05:00'),
('Fixing my bike.', 27, '2026-01-01 12:10:00'),
('Making art.', 28, '2026-01-01 12:15:00'),
('Writing code.', 29, '2026-01-01 12:20:00'),
('Enjoying the day.', 30, '2026-01-01 12:25:00');

-- Insert 30 replies (each user replies to the next user's tweet)
INSERT INTO reply (tweet_id, reply, user_id, date_time) VALUES
(2, 'Nice!', 1, '2026-01-01 13:00:00'),
(3, 'Sounds good!', 2, '2026-01-01 13:05:00'),
(4, 'Great job!', 3, '2026-01-01 13:10:00'),
(5, 'Yummy!', 4, '2026-01-01 13:15:00'),
(6, 'Interesting.', 5, '2026-01-01 13:20:00'),
(7, 'Enjoy!', 6, '2026-01-01 13:25:00'),
(8, 'Cool!', 7, '2026-01-01 13:30:00'),
(9, 'Love it!', 8, '2026-01-01 13:35:00'),
(10, 'Good luck!', 9, '2026-01-01 13:40:00'),
(11, 'Awesome!', 10, '2026-01-01 13:45:00'),
(12, 'Yay!', 11, '2026-01-01 13:50:00'),
(13, 'Fun!', 12, '2026-01-01 13:55:00'),
(14, 'Nice hobby!', 13, '2026-01-01 14:00:00'),
(15, 'Beautiful!', 14, '2026-01-01 14:05:00'),
(16, 'Inspiring!', 15, '2026-01-01 14:10:00'),
(17, 'Creative!', 16, '2026-01-01 14:15:00'),
(18, 'Great shot!', 17, '2026-01-01 14:20:00'),
(19, 'Green thumb!', 18, '2026-01-01 14:25:00'),
(20, 'Delicious!', 19, '2026-01-01 14:30:00'),
(21, 'Healthy!', 20, '2026-01-01 14:35:00'),
(22, 'Smart!', 21, '2026-01-01 14:40:00'),
(23, 'Go team!', 22, '2026-01-01 14:45:00'),
(24, 'Muy bien!', 23, '2026-01-01 14:50:00'),
(25, 'Peaceful.', 24, '2026-01-01 14:55:00'),
(26, 'Bon voyage!', 25, '2026-01-01 15:00:00'),
(27, 'Fix it fast!', 26, '2026-01-01 15:05:00'),
(28, 'So creative!', 27, '2026-01-01 15:10:00'),
(29, 'Keep coding!', 28, '2026-01-01 15:15:00'),
(30, 'Enjoy!', 29, '2026-01-01 15:20:00'),
(1, 'Thanks!', 30, '2026-01-01 15:25:00');

-- Insert 30 likes (each user likes their own tweet)
INSERT INTO like (tweet_id, user_id, date_time) VALUES
(1, 1, '2026-01-01 16:00:00'),
(2, 2, '2026-01-01 16:05:00'),
(3, 3, '2026-01-01 16:10:00'),
(4, 4, '2026-01-01 16:15:00'),
(5, 5, '2026-01-01 16:20:00'),
(6, 6, '2026-01-01 16:25:00'),
(7, 7, '2026-01-01 16:30:00'),
(8, 8, '2026-01-01 16:35:00'),
(9, 9, '2026-01-01 16:40:00'),
(10, 10, '2026-01-01 16:45:00'),
(11, 11, '2026-01-01 16:50:00'),
(12, 12, '2026-01-01 16:55:00'),
(13, 13, '2026-01-01 17:00:00'),
(14, 14, '2026-01-01 17:05:00'),
(15, 15, '2026-01-01 17:10:00'),
(16, 16, '2026-01-01 17:15:00'),
(17, 17, '2026-01-01 17:20:00'),
(18, 18, '2026-01-01 17:25:00'),
(19, 19, '2026-01-01 17:30:00'),
(20, 20, '2026-01-01 17:35:00'),
(21, 21, '2026-01-01 17:40:00'),
(22, 22, '2026-01-01 17:45:00'),
(23, 23, '2026-01-01 17:50:00'),
(24, 24, '2026-01-01 17:55:00'),
(25, 25, '2026-01-01 18:00:00'),
(26, 26, '2026-01-01 18:05:00'),
(27, 27, '2026-01-01 18:10:00'),
(28, 28, '2026-01-01 18:15:00'),
(29, 29, '2026-01-01 18:20:00'),
(30, 30, '2026-01-01 18:25:00');
