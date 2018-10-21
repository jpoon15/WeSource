"use strict";

const express = require('express');
const router  = express.Router();
const knex    = require('../lib/database-connection');
const bcrypt  = require('bcryptjs');


module.exports = router;

router.get("/:id", (req, res) => {
      knex
      .select("*")
      .from("resources")
      .join('categories', 'resources.category_id', '=', 'categories.id')
      .select('resources')
      .where({user_id: '1'})
      .then((results) => {
        console.log(results);
        let templateVars= {articles: results}
        res.render("mydashboard", templateVars);
      })
})

router.get("/:id/profile", (req, res) => {
  res.render("profile");
});

//Register a new User
router.post("/register", (req, res) => {
 // let userCurrent = req.session.id;
  console.log("we are in the registration post", req.body);
  const password = req.body.password;
  const hashedPassword = bcrypt.hashSync(password,10);
  //Will insert data into database from ajax request:
  knex('users')
    .insert({
      email: req.body.email,
      name: req.body.username,
      password: hashedPassword
    })
    .returning('id')
    .then((id) => {
      console.log("successfully inserted the record ");
      console.log(id);
      //allow them to be logged in upon registration?
      res.json({result: "True"});
  })


})
