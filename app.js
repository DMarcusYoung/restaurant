const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let reservations = [];
let waitList = [];

app.get("/api", (req, res) => {
    res.sendFile(path.join(__dirname, "home.html"));
})

app.get("/api/tables", (req, res) => {
    res.sendFile(path.join(__dirname, "tables.html"));
})

app.get("/api/reserve", (req, res) => {
    res.sendFile(path.join(__dirname, "reserve.html"));
})

app.get("/api/tableList", (req, res) => {
    res.send(reservations);
})

app.get("/api/waitList", (req, res) => {
    res.send(waitList);
})

app.get("/api/reservations", (req , res) => {
    res.json(reservations)
})

app.get("/api/waitlist", (req , res) => {
    res.json(waitList);
})

app.post("/api/reservations", (req, res) => {
    const newReservation = req.body;
    if(reservations.length < 5){
        reservations.push(newReservation);
        res.send(true);
    }else{
        waitList.push(newReservation);
        res.send(false);
    }
})

app.post("/api/clear", (req, res) => {
    reservations = [];
    waitList = [];
    res.send(true)
})

app.listen(PORT, () => console.log("App listening on PORT " + PORT));