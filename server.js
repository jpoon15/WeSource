"use strict";

require('dotenv').config();

const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";
const express     = require("express");
const bodyParser  = require("body-parser");
const sass        = require("node-sass-middleware");
const app         = express();

const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const morgan      = require('morgan');
const knexLogger  = require('knex-logger');

// Seperated Routes for each Resource
const homepageRoutes = require("./routes/homepage");
const usersRoutes = require("./routes/users");
const resourcesRoutes = require("./routes/resources");

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// Mount all resource routes
app.use("/api/homepage", homepageRoutes(knex));
app.use("/api/users", usersRoutes(knex));
app.use("/api/resources", resourcesRoutes(knex));

// Home page
app.get("/", (req, res) => {
  res.render("index");
});

// Resources
app.get("/resources", (req, res) => {
  res.render("index");
});

app.get("/user", (req, res) => {
  res.render("dashboard");
});

app.post('/test/:id',(req,res)=>{
  console.log(req.params);

  //res.json({result:"True"});

});
app.post('/backdoor', (req, res) => {
  console.log(req.body.email);

  // console.log(req.params.email);
  let email = req.body.email
    knex.select("*")
    .from("users")
    .where("email", "like",`%${email}%`)
    .then(user => {
      console.log(user);
      // req.session.id = user.id;
      // console.log(req.session.id)
      // res.redirect('/user/:id');
    });
});

app.post("/logout", (req, res) => {
  req.session = null;
  res.redirect("/");
});

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
