"use strict";

const express = require('express');
const router  = express.Router();
const knex    = require('../lib/database-connection');
const bcrypt  = require('bcryptjs');


module.exports = router;

router.get("/:id", (req, res) => {
  let userId = req.session.id;
  knex
    .select("*")
    .from("resources")
    .where("user_id", `${userId}`)
    .then(results => {
      let resResults = results;
      console.log("results1", resResults)
      knex.select("*")
        .from("likes")
        .where("likes.user_id", `${userId}`)
        .join("resources", "resources.id", "=", "likes.resource_id")
        .then(likedres => {
          console.log("likedResources", likedres)
          let templateVars= {
            articles: results,
            liked_res: likedres}
        res.render("mydashboard", templateVars);
      })
    })
})

router.get("/:id/profile", (req, res) => {
  res.render("profile");
});

//Register a new User
router.post("/register", (req, res) => {
  const password = req.body.password;
  const hashedPassword = bcrypt.hashSync(password,10);
  knex('users')
    .insert({
      email: req.body.email,
      name: req.body.username,
      password: hashedPassword
    })
    .returning('id')
    .then((id) => {
        let userId = req.session.id
      console.log("successfully inserted the record ");
      console.log(id);
      res.json({result: "True"});
    })
})
