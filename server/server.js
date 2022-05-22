require('dotenv').config({path: '../.env'})
const express = require("express");
const mysql = require("mysql");
const app = express();

const db = mysql.createPool({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASS,
    database:process.env.DB_NAME
});
app.use(express.json());


app.get("/api/fetchevents",(req, res) =>{
    const sqlGet = "SELECT * FROM event ORDER BY event_date ASC";
    db.query(sqlGet,(error,result)=>{
        if (error) {
            return res.status(500).json({error});
        }
        res.json(result);
    });
});
app.post("/api/postevent",(req,res)=>{
    const {event,venue,date} = req.body;
    const sqlPost = "INSERT INTO event (name, venue,event_date) VALUES (?,?,?)";
    db.query(sqlPost,[event,venue,date],(error,result)=>{
        if (error) {
            return res.status(500).json({error}); 
        }
        res.json(result.insertId);
    })
});

app.delete("/api/delete/:event_id",(req,res)=>{
    const {event_id } = req.params;
    const sqlDel = "DELETE FROM event WHERE event_id = ?";
    db.query(sqlDel,event_id,(error, results)=>{
        if (error) {
            return res.status(500).json({error}); 
        }
    }) ;
});

app.listen(5000,()=>{
    console.log("server running!")
})