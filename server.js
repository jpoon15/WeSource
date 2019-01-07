"use strict";

require('dotenv').config();

const PORT          = process.env.PORT || 8080;

const env           = process.env.NODE_ENV || 'development';

const express       = require("express");
const bodyParser    = require("body-parser");
const sass          = require("node-sass-middleware");
const app           = express();

const cookieSession = require('cookie-session');
const bcrypt        = require('bcryptjs');

const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const morgan        = require('morgan');
const knexLogger    = require('knex-logger');

// Seperated Routes for each Resource
const homepageRoutes = require("./routes/homepage");
const usersRoutes   = require("./routes/users");
const resourcesRoutes = require("./routes/resources");

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
// The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

app.use(cookieSession({
  name: 'session',
  keys: ['happy-days']
}))

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
app.use("/homepage", homepageRoutes);
app.use("/users", usersRoutes);
app.use("/resources", resourcesRoutes);

// Home page
app.get("/", (req, res) => {
  let templateVars    = {
    user: req.session.id
};
  res.render("index", templateVars);
});

// Resources
app.get("/resources", (req, res) => {
  res.render("index");
});

//Login
app.post('/login', (req, res) => {
  console.log("LOGIN", req.body);
  let email = req.body.email;
  let password = req.body.password;

    knex.select("*").first()
      .from("users")
      .where({
        email: req.body.email
        })
      .then(user => {
        if (bcrypt.compareSync(password, user.password)) {
          req.session.id = user.id;
          res.redirect('users/' + req.session.id);
        } else {
          res.status(403).send('Error - Username and Password does not match, go <a href="/"> back </a>');
        }
    });
});

app.post("/logout", (req, res) => {
  req.session = null;
  res.redirect("/");
});

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
