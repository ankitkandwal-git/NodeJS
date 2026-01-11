const express = require('express')
const app = express()
app.use(express.json());
const port = 3000;
app.get('/', function(req,res) {
      console.log("Server is running");
      res.send("Hello World");
})

app.get('/profile/:username',function(req,res){
    res.send(`Hello from ${req.params.username}`)
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})