DROP TABLE IF EXISTS district;
DROP TABLE IF EXISTS state;

CREATE TABLE state (
	state_id INTEGER PRIMARY KEY,
	state_name TEXT NOT NULL,
	population INTEGER
);

CREATE TABLE district (
	district_id INTEGER PRIMARY KEY,
	district_name TEXT NOT NULL,
	state_id INTEGER,
	cases INTEGER,
	cured INTEGER,
	active INTEGER,
	deaths INTEGER,
	FOREIGN KEY (state_id) REFERENCES state(state_id)
);

-- Clear tables before inserting (if needed)
-- DELETE FROM district;
-- DELETE FROM state;

INSERT INTO state (state_id, state_name, population) VALUES
	(1, 'Karnataka', 61095297),
	(2, 'Maharashtra', 112374333),
	(3, 'Tamil Nadu', 72147030);

INSERT INTO district (district_id, district_name, state_id, cases, cured, active, deaths) VALUES
	(1, 'Bangalore Urban', 1, 100000, 95000, 4000, 1000),
	(2, 'Pune', 2, 120000, 110000, 8000, 2000),
	(3, 'Chennai', 3, 90000, 85000, 4000, 1000),
	(4, 'Mysore', 1, 30000, 28000, 1500, 500),
	(5, 'Nagpur', 2, 40000, 37000, 2500, 500),
	(6, 'Coimbatore', 3, 25000, 24000, 800, 200);
