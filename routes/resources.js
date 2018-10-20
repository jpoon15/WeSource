"use strict";

const express = require('express');
const router  = express.Router();
const knex    = require('../lib/database-connection');

module.exports = router;

//DISPLAY SHOW PAGE
router.get("/:id", (req, res) => {
  console.log(req.params.id)
  let currentResourceId = req.params.id

  knex("resources")
    .where("id", `${currentResourceId}`).first()
    .then((results) => {
      console.log("results", results);
      let templeVars = {
        resource: results
      }
      res.render("detail", templeVars);
    });
});

//ADDING RESOURCES
router.post("/add", (req, res) => {
  let userCurrent = req.session.id;
  console.log("we are in the add post", req.body);

  knex('resources').insert({
      link: req.body.link,
      title: req.body.title,
      description: req.body.description,
      category_id: req.body.category_id,
      user_id: userCurrent
  }).returning('id')
  .then((id) => {
    console.log("successfully inserted the record ");
    console.log(id);
    res.json({result: "True"});
  })
})

//LIKING RESOURCE
router.post("/like", (req, res) => {
  let userCurrent = req.session.id
  console.log("we are in the like resource", req.body);

  knex('likes').insert({
    user_id: userCurrent,
    resource_id: req.body.resource_id
  }).returning('id')
  .then((id) => {
    console.log("successfully inserted the record");
    console.log(id);
    res.json({result: "True"});
  })
})
