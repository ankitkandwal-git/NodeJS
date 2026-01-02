const express = require('express');
const app = express();
const path = require('path')
const sqlite3 = require('sqlite3')
const {open} = require('sqlite');
const { get } = require('http');
const dbPath = path.join(__dirname , 'goodreads.db')
app.use(express.json());
let db = null;

const initalizeDbAndServer = async () => {
    try{
        db = await open({
            filename : dbPath,
            driver : sqlite3.Database
        })
        // Create 'book' table if it does not exist
        // await db.exec(`CREATE TABLE IF NOT EXISTS book (
        //     book_id INTEGER PRIMARY KEY AUTOINCREMENT,
        //     title TEXT NOT NULL,
        //     authorId INTEGER,
        //     rating REAL,
        //     ratingCount INTEGER,
        //     reviewCount INTEGER,
        //     description TEXT,
        //     pages INTEGER,
        //     dateOfPublication TEXT,
        //     editionLanguage TEXT,
        //     price INTEGER,
        //     onlineStores TEXT
        // );`);
        app.listen(3000, () =>{
            console.log("Server is running at http://localhost:3000/")
        })
    }catch(e){
        console.log(`DB Error : ${e.message}`);
    }
}

initalizeDbAndServer() 

//Get Book API

app.get('/books/',async(request,response) =>{
    const getBooksQuery = `SELECT * FROM book ORDER BY book_id;`;
    const booksArray = await db.all(getBooksQuery);
    response.send(booksArray)
})

//Get Book API 
app.get('/books/:bookId/',async(request,response) => {
    const {bookId} = request.params;
    const getBookQuery = `SELECT * FROM book WHERE book_id = ${bookId};`;
    const book = await db.get(getBookQuery);
    response.send(book)
})

//Add Book API
app.post('/books/',async(request,response) =>{
    const booksDetails = request.body;
    const {title,authorId,rating,ratingCount,reviewCount,description,pages,dateOfPublication,editionLanguage,price,onlineStores} = booksDetails;
    const addBookQuery = `INSERT INTO book (title,authorId,rating,ratingCount,reviewCount,description,pages,dateOfPublication,editionLanguage,price,onlineStores)
    VALUES ('${title}',${authorId},${rating},${ratingCount},${reviewCount},'${description}',${pages},'${dateOfPublication}','${editionLanguage}',${price},'${onlineStores}');`;
    const dbResponse = await db.run(addBookQuery);
    const bookId = dbResponse.lastID;
    response.send({bookId: bookId});
})

//Update Book API

app.put('/books/:bookId/',async(request,response) =>{
    const {bookId} = request.params;
    const bookDetails = request.body;
    const {title,authorId,rating,ratingCount,reviewCount,description,pages,dateOfPublication,editionLanguage,price,onlineStores} = bookDetails;
    const updateBookQuery = `UPDATE book SET
    title = '${title}',
    authorId = ${authorId},
    rating = ${rating},
    ratingCount = ${ratingCount},
    reviewCount = ${reviewCount},
    description = '${description}',
    pages = ${pages},
    dateOfPublication = '${dateOfPublication}',
    editionLanguage = '${editionLanguage}',
    price = ${price},
    onlineStores = '${onlineStores}'
    WHERE book_id = ${bookId};`;
    await db.run(updateBookQuery);
    response.send("Book Updated Successfully")
})

//Delete book API 
app.delete('/books/:bookId/',async(request,response) =>{
    const {bookId} = request.params;
    const deleteBookQuery = `DELETE FROM book WHERE book_id = ${bookId};`;
    await db.run(deleteBookQuery);
    response.send("Book Deleted Successfully")
})

// GET AUTHORE API   
app.get('/authors/:authorId',async(request,response) =>{
    const {authorId} = request.params;
    const getAuthorQuery = `SELECT * FROM author WHERE author_id = ${authorId};`;
    const author = await db.get(getAuthorQuery);
    response.send(author)
})