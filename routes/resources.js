"use strict";

const express = require('express');
const router  = express.Router();
const knex    = require('../lib/database-connection');

module.exports = router;

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



// router.get("/comments", (req, res) => {
//   knex("comments")
//     .where("resource_id", `${currentResourceId}`)
//     .then((results) => {
//       res.json(results);
//     })
// });
