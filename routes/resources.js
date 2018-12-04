"use strict";

const express         = require('express');
const router          = express.Router();
const createResource  = require('../lib/database-helper');
const knex            = require('../lib/database-connection');

module.exports = router;

//------------ RESOURCE SHOW PAGE ------------ //
router.get("/:id", (req, res) => {
  let currentResourceId = req.params.id
  let userId = req.session.id;

  if(!req.session.id) {
  knex("resources")
    .where("id", `${currentResourceId}`).first()
    .then((results) => {
      let templeVars = {
        resource: results,
        user: undefined
        }
        res.render("detail", templeVars);
      })
  } else {
   knex("resources")
      .where("id", `${currentResourceId}`).first()
      .then((results) => {
        knex("likes")
        .where("resource_id", `${currentResourceId}`)
        .andWhere("user_id", `${userId}`).first()
        .then((likesres) => {
          let templeVars = {
            resource: results,
            like: likesres,
            user: userId
          }
          res.render("detail", templeVars);
        })
      })
  }
});

//------------ ADDING RESOURCES ------------ //
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
          imgurl: resultImg || 'http://localhost:8080/images/thumb.jpg', // scrape
          delete: 0
        }).returning('id')
        .then((id) => {
          res.json({result: "True"});
        })
    })
})

//------------ LIKING RESOURCES ------------ //
router.post("/like", (req, res) => {
  let userCurrent = req.session.id
  knex('likes').insert({
    user_id: userCurrent,
    resource_id: req.body.resource_id
  }).returning('id')
  .then((id) => {
    res.json(id);
  })
})

// UNLIKE RESOURCE
router.post("/deletelike", (req, res) => {
  let userCurrent = req.session.id

  knex('likes')
    .where('id', req.body.like_id)
    .del()
    .then(function (result) {
      console.log(result);
  res.send('successful deletion');
  });
})

//------------ DELETE RESOURCE ------------ //
router.post("/delete", (req, res) => {
  let userCurrent = req.session.id;
  let resource_id = req.body.resource_id;

  knex('resources')
    .where('id', resource_id)
    .update({
      delete: 1
    })
    .then(function(result) {
      console.log(result);
    })
  res.redirect('/');
});




