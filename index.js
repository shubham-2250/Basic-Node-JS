const express = require("express");
const users = require("./mock_data.json");
const fs = require("fs");
const app = express();

app.use(express.urlencoded({ extended : false}));



app.route("/users").get((req,res)=>{
    const html =  `
    <ul>
    ${users.map((user)=>`<li>${user.first_name}</li>`).join("")}
    </ul>
    `;
    res.send(html);
});

app.route("/users/:id").get((req,res)=>{
    const user = users.find(user => user.id == req.params.id);

    res.json(user);
}).post((req,res)=>{
    
    
    const body = req.body;
    
    users.push({...body,id:users.length+1});
    fs.writeFile("./mock_data.json", JSON.stringify(users), ()=>{
        return res.json({status:"success", id: users.length});
    });
}).patch((req,res)=>{
    const user = users.find(user => user.id == req.params.id);
    users.splice(users.findIndex(x=> x.id == req.params.id),1);
    const body = req.body;
    users.push({...user,...body, id: parseInt(req.params.id)});
    fs.writeFile("./mock_data.json", JSON.stringify(users), ()=>{
        return res.json({status:"success", id: req.params.id});
    });
}).delete((req,res)=>{
    
console.log(users.findIndex(x=> x.id == req.params.id));
    users.splice(users.findIndex(x=> x.id == req.params.id),1);

    fs.writeFile("./mock_data.json", JSON.stringify(users), ()=>{
        return res.json({status:"success", id: req.params.id});
    });
});


app.listen(8000,()=>{console.log("server started")});