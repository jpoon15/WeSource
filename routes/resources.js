"use strict";

const express = require('express');
const router  = express.Router();
const knex    = require('../lib/database-connection');

module.exports = router;

router.get("/:id", (req, res) => {
  res.render("detail");
});

router.get("/search", (req, res) => {
  let searchKeyword = lowercase(req.query.search);
  console.log("search", req.query.search);

  knex.select("*")
    .from("resources")
    .where("title", "like",`%${searchKeyword}%`)
    .orWhere("description","like",`%${searchKeyword}%`)
    .orWhere("link", "like",`%${searchKeyword}%`)
    .then((results) => {
      res.json(results);
    })
    res.redirect("/")
});

router.post("/add", (req, res) => {
  let userCurrent = req.session.id;
  console.log("we are in the add post", req.body);
  //let newData = req.body;
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
  //let userCurrent = req.session.id;
  // //console.log("REQ cat: ", req.body);
  // let newResource = {
  //   link: req.body.resourceUrl,
  //   title: req.body.resourceTitle,
  //   description: req.body.resourceDescription,
  //   category_id: req.body.resourceCategory, 
  //   //imgUrl = req.body.resourceCategory,
  //   user_id: userCurrent
  // }

  //console.log("NEW RESOURCE: ", newResource);
})
