// TO RUN IT USE COMMAND NPM RUN START than type localhost:5000 on broswer

// Using the FS module to read and write the file
let fs=require("fs");

// Using the module EXPRESS , start to listen to request on PORT 5000
const express = require('express');
const app = express();
app.listen(process.env.PORT || 5000, () => console.log("Server running..."));

// read as json
app.use(express.json());
// read text
app.use(express.urlencoded());
// Server the front resources
app.use(express.static('public'));


// Array of object that contain list of users
let users = [
    {username: "sinet", password : "123", sex: "Female", color: "pink", text: "Hello everyone!", time: "5/19/2021-10:00AM",bold: "", italic:"", id: 1},
    {username: "chanry", password : "456", sex: "Female", color: "cyan", text: "hello! how are you?", time: "5/19/2021-10:01AM", bold: "", italic:"", id: 2},

]

// GET method, get message
app.get('/users', (req , res) =>{
    users= JSON.parse(fs.readFileSync("data.json"));
    res.send(users);
})

// Create message
app.post('/users', (req, res) =>{
    let id= users.length+1;
    let userlist = req.body;
    userlist.id = id;
    users.push(userlist);
    fs.writeFileSync("data.json" ,JSON.stringify(users));
    res.send(users);
});

// Delete message
app.delete("/users/:id", (req,res) =>{
     
    let id = req.params.id;
    for (let index in users){
        let userId = users[index].id;
        if (userId === parseInt(id)){
            users.splice(index,1);
            fs.writeFileSync("data.json" ,JSON.stringify(users));
            
        }
    }
   
});

// update message
app.put("/users/:id", (req , res) => {
    let id = req.params.id;
    let text = req.body.text;
 
    for (let index in users){
        let userId = users[index].id;
        if (userId === parseInt(id)){
            users[index].text = text;
            fs.writeFileSync("data.json" ,JSON.stringify(users));
            res.send(users);
        }
    }

})





