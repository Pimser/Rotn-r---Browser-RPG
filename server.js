const express = require("express");
const _ = require("lodash");
const app = express();


app.set("view engine", "ejs");
app.listen(4000);

const path = require("path");

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) =>{
    res.render("index", { title: "Home", root: __dirname});
});

app.get("/GameFrame", (req, res) =>{
    res.render("GameFrame", { title: "GameScreen", root: __dirname});
});

app.get("/login", (req, res) =>{
    res.render("login", { title: "Login", root: __dirname});
});

app.get("/about", (req, res) =>{
    res.render("about", { title: "About", root: __dirname});
});




app.use((req, res) =>{
    res.status(404).render("404", { title: "404", root: __dirname});
});


