const express = require('express')
const app = express()
const {open} = require('sqlite')
const path = require('path')
const sqlite3 = require('sqlite3')
const { get } = require('http')
const { CONNREFUSED } = require('dns')
const dbpath= path.join(__dirname,'todoApplication.db')
let db = null
app.use(express.json())

const initializeDbAndServer = async () => {
    try{
        db = await open({
            filename: dbpath,
            driver : sqlite3.Database
        })
        app.listen(3000,() => {
            console.log("Server is running at http://localhost:3000/")
        })
    }catch(e){
        console.log(`DB Error: ${e.message}`)
        process.exit(1)
    }
}
initializeDbAndServer()

const  hasPriorityAndStatusPropertis = (requestQuery) => {
    return(
        requestQuery.priority !== undefined && requestQuery.status !== undefined
    )
}
const hasPriorityProperties = (requestQuery) => {
    return requestQuery.priority !== undefined
}
const hasStatusProperties = (requestQuery) => {
    return requestQuery.status !== undefined    
}
// API 1 
app.get('/todos/' , async (request,response) => {
    let data = null
    const {status,priority, search_q=""} = request.query 
    switch(true){
        case hasPriorityAndStatusPropertis(request.query):
            getTodoQuery = `SELECT * FROM todo WHERE todo LIKE '%${search_q}%' 
            AND status = '${status}' AND priority = '${priority}';`
            break;
        case hasPriorityProperties(request.query):
            getTodoQuery = `SELECT * FROM todo WHERE  todo LIKE '%${search_q}%'
            AND priority = '${priority}';`
            break;
        case hasStatusProperties(request.query):
            getTodoQuery = `SELECT * FROM todo WHERE todo LIKE '%${search_q}%'
            AND status = '${status}';`
            break;
        default : 
            getTodoQuery = `SELECT * FROM todo WHERE todo LIKE '%${search_q}%';`
    }
    data = await db.all(getTodoQuery)
    response.send(data)
})

// API 2 /todos/:todoId/ return a specific todo based on todo ID
app.get('/todos/:todoId/',async(request,response) =>{
    const {todoId} = request.params;
    const getTodoQuery = `SELECT * FROM todo WHERE id = ${todoId};`;
    const todo = await db.get(getTodoQuery);
    response.send(todo);
})

// API 3 CREATE a todo in todo table
app.post('/todos/',async(request,response) =>{
    const todoDetails = request.body;
    const {id,todo,priority,status} = todoDetails;
    const createTodoQuery = `INSERT INTO todo (id,todo,priority,status)
    VALUES (${id},'${todo}','${priority}','${status}');`;
    await db.run(createTodoQuery);
    response.send("Todo Successfully Added");
})

// API 4 UPDATE a todo in todo table
app.put('/todos/:todoId/',async(request,response) =>{
    const {todoId} = request.params;
    const todoDetails = request.body;
    let updateMessages = [];
    if (todoDetails.status !== undefined) {
        updateMessages.push("Status Updated");
    }
    if (todoDetails.priority !== undefined) {
        updateMessages.push("Priority Updated");
    }
    if (todoDetails.todo !== undefined) {
        updateMessages.push("Todo Updated");
    }
    const {todo,priority,status} = todoDetails;
    const updateTodoQuery = `UPDATE todo SET 
    todo = '${todo}',
    priority = '${priority}',
    status = '${status}'
    WHERE id = ${todoId};`;
    await db.run(updateTodoQuery);
    response.send(updateMessages.join(", "))
})

// API 5 DELETE a todo from todo table
app.delete('/todos/:todoId/',async(request,response) =>{
    const {todoId} = request.params;
    const deleteTodoQuery = `DELETE FROM todo WHERE id = ${todoId};`;
    await db.run(deleteTodoQuery);
    response.send("Todo Deleted")
})