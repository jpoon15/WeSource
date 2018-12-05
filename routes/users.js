"use strict";

const express = require('express');
const router  = express.Router();
const knex    = require('../lib/database-connection');
const bcrypt  = require('bcryptjs');


module.exports = router;

var salt = bcrypt.genSaltSync(10);

//------------ DASHBOARD ------------ //

router.get("/:id", (req, res) => {
  let userId = req.session.id;
  knex
    .select("*")
    .from("resources")
    .where("delete", 0)
    .andWhere("user_id", `${userId}`)
    .then(results => {
      let resResults = results;
      knex.select("*")
        .from("likes")
        .where("likes.user_id", `${userId}`)
        .groupBy("resources.id", "likes.id")
        .having("delete", "=", 0)
        .join("resources", "resources.id", "=", "likes.resource_id")
        .then(likedres => {
          let templateVars= {
            articles: results,
            liked_res: likedres,
            user: userId
          }
          res.render("mydashboard", templateVars);
        })
    })
})

//------------ PROFILE PAGE ------------ //

router.get("/:id/profile", (req, res) => {
  let userId = req.session.id;
  knex
    .select("*")
    .from('users')
    .where("id", `${userId}`).first()
    .then(results => {
      let templateVars= {
        userid: req.session.id,
        user: results
        }
      res.render("profile", templateVars);
    })
});

//EDIT PROFILE
router.post("/:id/profile", (req, res) => {
  let userId = req.session.id;
  let password = req.body.password
  const hashedPassword = bcrypt.hashSync(password, salt);

    knex('users')
      .where('id', userId)
      .update({
        name: req.body.name,
        email: req.body.email,
        aboutme: req.body.aboutme,
        password: hashedPassword
      })
      .then((result) => {
        res.json({result: "True"});
    })
});

//------------ REGISTER ------------ //
router.post("/register", (req, res) => {
  const password = req.body.password;
  const hashedPassword = bcrypt.hashSync(password, salt);
  knex('users')
    .insert({
      email: req.body.email,
      name: req.body.username,
      password: hashedPassword
    })
    .returning('id')
    .then((id) => {
        let userId = req.session.id
      res.json({result: "True"});
    })
})
