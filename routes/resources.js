"use strict";

const express         = require('express');
const router          = express.Router();
const createResource  = require('../lib/database-helper');
const knex            = require('../lib/database-connection');

module.exports = router;

//DISPLAY SHOW PAGE
router.get("/:id", (req, res) => {
  //console.log(req.params.id)
  let currentResourceId = req.params.id
  knex("resources")
    .where("id", `${currentResourceId}`).first()
    .then((results) => {
      // console.log("results", results);
      let templeVars = {
        resource: results,
        user: req.session.id
      }
      res.render("detail", templeVars);
    });
});

//ADDING RESOURCES
router.post("/add", (req, res) => {
  let userCurrent = req.session.id;
  createResource(req.body.link)
    .then((resultImg) => { 
        knex('resources').insert({
          link: req.body.link,
          title: req.body.title,
          description: req.body.description,
          category_id: req.body.category_id,
          user_id: userCurrent,
          imgurl: resultImg // scrape
        }).returning('id')
        .then((id) => {
          //console.log("successfully inserted the record of:  ", id);
          res.json({result: "True"});
        })
    })
})

//LIKING RESOURCE
router.post("/like", (req, res) => {
  let userCurrent = req.session.id
  knex('likes').insert({
    user_id: userCurrent,
    resource_id: req.body.resource_id
  }).returning('id')
  .then((id) => {
    console.log("successfully inserted the record");
    // console.log(id);
    res.json(id);
  })
})

//DELETING LIKED RESOURCE
router.post("/delete", (req, res) => {
  let userCurrent = req.session.id
  console.log("we are in the delete resource", req.body);

  knex('likes')
    .where('like_id', req.body.like_id)
    .del()

  res.send('successful deletion');
});





