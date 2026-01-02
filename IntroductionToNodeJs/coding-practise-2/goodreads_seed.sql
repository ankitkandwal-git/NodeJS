-- Create author table
CREATE TABLE IF NOT EXISTS author (
  author_id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL
);

-- Create book table
CREATE TABLE IF NOT EXISTS book (
  book_id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  authorId INTEGER,
  rating REAL,
  ratingCount INTEGER,
  reviewCount INTEGER,
  description TEXT,
  pages INTEGER,
  dateOfPublication TEXT,
  editionLanguage TEXT,
  price INTEGER,
  onlineStores TEXT,
  FOREIGN KEY (authorId) REFERENCES author(author_id)
);

-- Insert sample authors
INSERT INTO author (name) VALUES ('J.K. Rowling');
INSERT INTO author (name) VALUES ('J.R.R. Tolkien');

-- Insert sample books
INSERT INTO book (title, authorId, rating, ratingCount, reviewCount, description, pages, dateOfPublication, editionLanguage, price, onlineStores) VALUES (
  'Harry Potter and the Order of the Phoenix', 1, 4.62, 126559, 611, 'There is a door at the end of a silent corridor.', 352, 'May 1st 2003', 'English', 850, 'Amazon,Audible,Indigo,Apple Books,Google Play,IndieBound'
);
INSERT INTO book (title, authorId, rating, ratingCount, reviewCount, description, pages, dateOfPublication, editionLanguage, price, onlineStores) VALUES (
  'The Lord of the Rings', 2, 4.5, 200000, 1000, 'An epic high-fantasy novel.', 1178, 'July 29th 1954', 'English', 1200, 'Amazon,Audible,Indigo,Apple Books,Google Play,IndieBound'
);
