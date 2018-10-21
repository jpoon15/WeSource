"use strict";

const express = require('express');
const router  = express.Router();
const knex    = require('../lib/database-connection');
const bcrypt  = require('bcryptjs');


module.exports = router;

router.get("/:id", (req, res) => {
  
  knex.select(
    'r.id',
    'r.title',
    'r.link',
    'r.description',
    'r.imgurl',
    'r.category_id',
    'r.user_id',
    'cs.id',
    'cs.category',
    'lks.id as likesId',
    'lks.resource_id as likesResourceId ',
    'lks.user_id as likesUserId',
    'usr.email'
    )
    .from('resources AS r')
    .leftJoin('categories AS cs', 'r.category_id', 'cs.id') //joining resources with categories 
    .leftJoin('likes AS lks', 'r.id', 'lks.resource_id')
    .leftJoin('users AS usr', 'r.user_id', 'usr.id' )
    .where('lks.user_id', '=', 1)
    .then((results)=>{
      console.log(results)
      let templateVars= {articles: results}
        res.render("mydashboard", templateVars);
    });

  knex
    .select("*")
    .from("resources")
    .join('categories', 'resources.category_id', '=', 'categories.id')
    .select('resources')
    .where({user_id: '1'})
    .then((results) => {
      let templateVars= {articles: results}
      res.render("mydashboard", templateVars);
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
      console.log("successfully inserted the record ");
      console.log(id);
      res.json({result: "True"});
    })
})
